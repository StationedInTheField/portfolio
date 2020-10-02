# Quest PubSub JS
>Quantum Scare: Currently Quest Network PubSub uses elliptic curve cryptopgraphy for signatures, but we are already looking at post quantum algorithms.

# Description

The JavaSript implementation of the QuestNetwork PubSub Protocol. Uses the [Interplanetary Filesystem](https://ipfs.io) and [IPFS GossipSub](https://blog.ipfs.io/2020-05-20-gossipsub-v1.1/).

# Installation & Usage

``npm install @questnetwork/quest-pubsub-js@0.9.3``

You can `npm run test`, which will compile and run the test.js file.

We recommend to use our [quest-cli](quest-cli) to test and build the package.
Pro Tip: Put a file in your `/bin` that runs the quest-cli like so `node /path/to/quest-cli/index.js` from any folder on your system. It's much nicer!

# Features

**0.9.0**
- Basic functionality + Decentralized Captcha

**0.9.1**
- Added invite codes and plist sync

**0.9.3**
- Added social types
