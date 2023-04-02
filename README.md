# Simple users admin dashboard

This is simple dashboard allows you to whitelist users in the smart-contract in the ethereum network.

### How to run? 🤔

Firstly, you should deploy your own version of smart-contract. Here is the steps to do it:

```sh
# install all dependencies
npm i

# set correct env variable in the file ./packages/contracts/.env using example ./packages/contract/.env.example
# MNEMONIC=<your-mnemonic> (address 0 from mnemonic will be used to deploy contract)
# GOERLI_NODE_URL="<goerli-ethereum-node-url>"

# then run deploy script
npm run deploy:goerli -w ./packages/contracts

# then copy contract address from output, and you are done :)
```

After, that create `.env` file in the root of the project, and fill it by variables, as in `.env.example`. And the last step - just run everything in docker:

```sh
docker-compose --env-file .env up
```
