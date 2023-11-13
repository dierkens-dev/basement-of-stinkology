/* eslint-disable @typescript-eslint/no-var-requires */
const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

admin.initializeApp({
  projectId: "basement-of-stinkology",
  // Download from https://console.cloud.google.com/iam-admin/serviceaccounts/details/117491397100251121931/keys?orgonly=true&project=basement-of-stinkology&supportedpurview=organizationId
  credential: admin.credential.cert(".credentials/basement-of-stinkology.json"),
});

// Use this for project default tenant (no tenant).
// const authFromOrTo = admin.auth()
const authFrom = admin
  .auth()
  .tenantManager()
  .authForTenant(process.env.FROM_TENANT_ID);
const authTo = admin
  .auth()
  .tenantManager()
  .authForTenant(process.env.TO_TENANT_ID);

function migrateUsers(userImportOptions, nextPageToken) {
  let pageToken;
  authFrom
    .listUsers(1000, nextPageToken)
    .then(function (listUsersResult) {
      const users = [];
      listUsersResult.users.forEach(function (user) {
        const modifiedUser = user.toJSON();
        // Convert to bytes.
        if (user.passwordHash) {
          modifiedUser.passwordHash = Buffer.from(user.passwordHash, "base64");
          modifiedUser.passwordSalt = Buffer.from(user.passwordSalt, "base64");
        }
        // Delete tenant ID if available. This will be set automatically.
        delete modifiedUser.tenantId;
        users.push(modifiedUser);
      });
      // Save next page token.
      pageToken = listUsersResult.pageToken;
      // Upload current chunk.
      return authTo.importUsers(users, userImportOptions);
    })
    .then(function (results) {
      results.errors.forEach(function (indexedError) {
        console.log("Error importing user " + indexedError.index);
      });
      // Continue if there is another page.
      if (pageToken) {
        migrateUsers(userImportOptions, pageToken);
      }
    })
    .catch(function (error) {
      console.log("Error importing users:", error);
    });
}

const userImportOptions = {
  hash: {
    algorithm: "SCRYPT",
    // The following parameters can be obtained from the "Users" page in the
    // Cloud console. The key must be a byte buffer.
    key: Buffer.from(process.env.FROM_HASH_KEY, "base64"),
    saltSeparator: Buffer.from(process.env.FROM_HASH_SALT, "base64"),
    rounds: 8,
    memoryCost: 14,
  },
};

migrateUsers(userImportOptions);
