# File-share

This project helps to transfer file over HTTP/HTTPS

### Clone the repo

```bash
git clone https://github.com/micaiah-effiong/File-share.git

cd File-share
```

## Install node modules

To install all dependencies execute

```bash
npm install
```

Adding dependencies with lerna can be done be executing

```bash
npm run bootstrap
```

### Installing packages

The project uses lerna and workspace so to install packages you have the specify the workspace name

```bash
lerna add <package name> --scope=@share-box/server
```

To install module as root

```bash
lerna add <package name>
```

### Start all dev server

Depending on you package manager run the following instructions

```bash
# client
yarn client:dev
# or
npm run client:dev

# server
yarn server:dev
# or
npm run server:dev
```

you can also run but server in development mode

```bash
yarn dev
# or
npm run dev
```

### Setup environment variables

In the client folder create a file called `.env.[mode].local` and add the following.
Mode is either `development` or `production` depending on the mode you want to run the app in.
[See Vitejs documentation for more details on .env files](https://vitejs.dev/guide/env-and-mode.html#env-files)

```bash

```

In development mode, add the external API url of the server to fetch data from.

### Build and compile to JS

```bash
yarn build
# or
npm run build
```

### Start the server

```bash
yarn start
# or
npm run start
```
