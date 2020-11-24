# Mantis Faucet Web

Web interface for Mantis Faucet

## Prerequisites

* [Node.js](https://nodejs.org/en/) - tested with v12
  * (optional) [nvm](https://github.com/nvm-sh/nvm) - you can use nvm to automatically pick-up the Node version you need
* [yarn](https://classic.yarnpkg.com/en/) - tested with v1.22.5

## Initialize the project

Running the `yarn` command in the project directory will download the dependencies. After this action, all the script below can be run. 

## Scripts

### `yarn build`

Build code from `src` for production.

### `yarn start`

Start webpack development server watching for changes in `src` directory.

## Configuration

Webpack reads following environment variables (from `process.env`):

* `FAUCET_NODE_URL`