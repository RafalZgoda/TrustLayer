## DAS dApp Boilerplate

Boilerplate to dev dApp

## Stack

- Node 20
- npm >10
- Typescript
- NextJS 14
- Tailwind
- RainbowKit
- Wagmi
- Heroicons
- Shadcn

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Configure chains & wallet

- Add your desired chains and wallets in: `config/wagmiProvider.tsx`

## Add smart contracts

- Add ABIs and addresses in: `contract/contractName.ts` following: `contract/template.ts`

## Use smart contracts

- Write contract: `guides/WriteContractTemplateScreen.ts`
- Read contract: `guides/ReadContractTemplateScreen.ts`

## Use wallet data

- See: `guides/useWalletConnectedInfo.ts`

## Add new page

- Create the page file you want in: `pages/`
- Follow: `pages/template.txt`
