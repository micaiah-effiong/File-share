# File-share

### Clone the repo

```bash
git clone https://github.com/micaiah-effiong/File-share.git
```

### Install node modules

```bash
yarn install
```

### Installing packages

The project uses workspaces so to install packages you have the specify the workspace

```bash
yarn workspace <workspace name> add <package name>
```

To install module as root

```bash
yarn add <package name> -W
```

### Start all dev server

```bash
# Client
yarn client:dev

#Server
yarn server:dev
```

### Setup environment variables

In the client folder create a file called `.env.[mode].local` and add the following.
Mode is either `development` or `production` depending on the mode you want to run the app in.
[See Vitejs documentation for more details on .env files](https://vitejs.dev/guide/env-and-mode.html#env-files)

````bash

In development mode, add the external API url of the server to fetch data from.

### Build and run

```bash
# build both client and server
yarn build

# run server
yarn start
````
