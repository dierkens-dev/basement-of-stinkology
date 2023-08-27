# Basement of Stinkology

Web app for the Basement of Stinkology.

## Contributing

### Software

Install the following software

- [Yarn Classic](https://classic.yarnpkg.com/lang/en/docs/install/)

### Application Development

#### Setup

```
yarn install
```

##### Create a `.env` file

```
BOS_FIREBASE_API_KEY=<bos-firebase-api-key>
BOS_FIREBASE_AUTH_DOMAIN=<bos-firebase-auth-domain>
BOS_POSTGRES_PASSWORD=<bos-postgres-password>
BOS_POSTGRES_USER=<bos-postgres-user>
BOS_SESSION_STORAGE_SECRET=<bos-session-storage-secret>
BOS_THE_MOVIE_DB_API_KEY=<bos-the-movie-db-api-key>
```

> Note: You can pull these from the pulumi config if you have that setup with `pulumi config get KEY`

#### Commands

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

### Infrastructure Development

#### Software

Install the following software

- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install)
- [Pulumi](https://www.pulumi.com/docs/install/)

#### Setup

##### Google Cloud

```
gcloud config configurations create bos
gcloud config set project basement-of-stinkology
gcloud config set account <username@dierkens.dev>
gcloud auth login
gcloud config set compute/region us-east5
gcloud auth application-default login
```

##### Pulumi

```
pulumi login gs://bos-pulumi-state-bucket
yarn pulumi stack select production
```

#### Commands

##### Deploy

```
yarn pulumi up
```

##### Tear Down

```
yarn pulumi down
```
