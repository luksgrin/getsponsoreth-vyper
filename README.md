# GetSponsoreth _`vyper` edition_
Built with 🏗 Scaffold-ETH 2

## 🛠 Setup

Install dependencies with `yarn install`. Make sure to define a proper `.env` file as described in `example.env`. Then, open a terminal and run

```bash
source .env && \
yarn chain --fork-url $GOERLI_RPC_URL --chain-id 31337
```

This has an anvil instance running (forking goerli of course).

In another terminal, run

```bash
cd packages/foundry && \
forge script script/Deploy.s.sol \
--ffi --broadcast \
--rpc-url http://localhost:8545 && \
python script/fix_names_in_receipt.py && \
python script/create_interfaces.py && \
node script/generateTsAbis.js && \
cd ../..
```

to deploy the contracts. Next, run

```bash
yarn start -H 127.0.0.1
```

to initialize the frontend on `http://localhost:3000`.