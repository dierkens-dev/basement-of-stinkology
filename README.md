# Basement of Stinkology

Web app for the Basement of Stinkology.

## Contributing

### Software

Install the following software

- [PNPM](https://pnpm.io/installation)

### Application Development

#### Setup

```
pnpm install
```

##### Create a `.env` file

```
BOS_ASSET_BUCKET_NAME=bos-asset-bucket-494fbc7
BOS_DATABASE_URL=<bos-development-database-url>
BOS_FIREBASE_API_KEY=<bos-firebase-api-key>
BOS_FIREBASE_AUTH_DOMAIN=<bos-firebase-auth-domain>
BOS_POSTGRES_PASSWORD=<bos-postgres-password>
BOS_POSTGRES_USER=<bos-postgres-user>
BOS_SESSION_STORAGE_SECRET=<bos-session-storage-secret>
BOS_SHADOW_DATABASE_URL=<bos-development-shadow-database-url>
BOS_TENANT_ID="development-41vl2"
BOS_THE_MOVIE_DB_API_TOKEN=<bos-the-movie-db-api-key>
```

> Note: You can pull some of these from the pulumi config if you have that setup with `pulumi config get KEY`

#### Commands

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
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
yarn pulumi stack select dev
```

#### Commands

##### Deploy

```
pnpm pulumi up
```

##### Tear Down

```
pnpm pulumi down
```
