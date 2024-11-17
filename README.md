### Crypto AI Shark Tank

This is a submission repo for 2024 Devcon/EthGlobal Hackathon @Bangkok.
The business situation is that, the current meta has proven that it is possible for AI agents to own on-chain wallets and make successful trades and profitable actions.

Thus in-short they may just be good investors or fund managers. Why not let them evaluate Crypto Hackathon projects and see whether they are worthy investments? Perhaps they can reap large profits or bring huge value in the short span of time. 

VCs can also now just park their money on these AI agents/ fund managers so as to lessen their work on analyzing projects.

For this hack, we used Coinbase Agentkit to create 5 AI agent Sharks each with distinct personalities and analytical strengths. (Each representing a different meta in the crypto space)


<img src="./displays/cypherpunkPepe.png" width="200" />
<img src="./displays/harrySonicInu.png" width="200" />
<img src="./displays/mika.png" width="200" />
<img src="./displays/miladyShark.png" width="200" />
<img src="./displays/sophiDoge.png" width="200" />

Agents can converse with project teams to ask more questions. In the process, users learn about projects quicker, founders learn how to pitch to prospective investors via watching the AI agents pick.

For normal human users, they can take part in the prediction of the projects' well being as well, and earn rewards for the correct predictions. This also thus bring about more liquidity for projects funding as some percentage of the winnings goes to the project team for substenance.

**What We did for this project **
We scraped the Eth Global hackathon site for past projects. [Refer to this folder](https://github.com/0xhatsume/CryptoAiSharkTank/tree/main/scrapers)

We deloyed the few EVM Betting Market contracts to act as such project predictions. They can be found in the addresses below in their respective chains. [also refer to this folder](https://github.com/0xhatsume/CryptoAiSharkTank/tree/main/prediction_contracts)

We created 5 AI agents with on-chain wallets so they can make "Investments/Funding Grants" on the projects listed on the betting markets. [also refer to this folder](https://github.com/0xhatsume/CryptoAiSharkTank/tree/main/coinbase-agentkit)

To facilitate easier access to the betting markets, we built a Telegram mini-app ([deployed here](t.me/CryptoAiSharkBot/CryptoAiSharkTank))which can allow more user time on the product. The user on-boarding and wallet sign-in is done via Dynamic wallet [Refer to front-end repo for wallet implementation](https://github.com/0xhatsume/CryptoAiSharkTank/tree/main/client).

An xmtp chat app was created to allow use of intents to vote via chat windows and various on-chain txn executions. [Refer to xmtp folder](https://github.com/0xhatsume/CryptoAiSharkTank/tree/main/group-invest-xmtp)


### Deployments

**Sepolia** (mainnet)
0xdD56bE2227996737444f2FEE3BdCDAa792d3BA60

**Scroll Testnet**
0x1742A5BA614CD5E9EDF08c82A470f84970E3B2BB

**Polygon Mainnet POS***
0x1742A5BA614CD5E9EDF08c82A470f84970E3B2BB

**Base Sepolia**
0x1742A5BA614CD5E9EDF08c82A470f84970E3B2BB

**Zircuit Testnet**
0x1742A5BA614CD5E9EDF08c82A470f84970E3B2BB

**Morphholesky Testnet**
0xdD56bE2227996737444f2FEE3BdCDAa792d3BA60

**FLOW EVM Testnet**
0x1742A5BA614CD5E9EDF08c82A470f84970E3B2BB