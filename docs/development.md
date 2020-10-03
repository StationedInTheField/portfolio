# Development

## Planning 

See our [Kanban](https://github.com/orgs/QuestNetwork/projects/1) for the development of 0.9.4, feel free to add or pick up features!

## Prerequisites

1.) 

Clone & Checkout essential repositories:
```
git clone qd-social-ts && git clone qd-messages-ts && git clone qDesk && cd qd-social-ts   && git checkout 0.9.3 && cd ..  &&  cd qd-messages-ts   && git checkout 0.9.3-rc1 && cd ..  &&  cd qDesk   && git checkout 0.9.3-rc1 && cd ..
```

OR 

Clone & Checkout all repositories on the latest dev branch:
``` 
git clone qDesk && cd qDesk && git checkout 0.9.4 && npm run q-dev && cd ..
````

2.) Install Dependencies & Enter qDesk Repository:
```
cd qd-social-ts && npm run inst && cd .. && cd qd-messages-ts && npm run inst && cd .. && cd qDesk && npm run inst
```

## Commands

**Prepare Package**

To The same directory you're cloning this repository to.

``npm run inst`` Removes `package-lock.json` and runs ``npm install``

**Build For Linux**

``npm run linux`` Builds Linux AppImage and Snap files to `dist/`

**Build For Mac**
```
sed -i 's/"@questnetwork\/q-desk"/"q-desk"/g' package.json
&& npm run mac && 
sed -i  's/"q-desk"/"@questnetwork\/q-desk"/g'  package.json
```
Builds MacOS DMG and .app files to ``dist/`` and ``dist/mac``

**Build For IPFS**

``ipfs daemon & npm run ipfs``  Creates the bundled application for the web with dynamic base path to ```dist/web```

**Build For Web**

``npm run web`` Creates the bundled application for the web with static base path ```/```  to ```dist/web```

**Serve For Web**

``npm run serve`` Serves the bundled application on ```localhost:4200``` from ```dist/web```

**Serve For Web JIT**

``ng serve`` Serves a just in time compilation of the messenger on ```localhost:4200```

**Rest `node_modules` And Build For Web JIT**

``npm run serve-fresh`` Runs ``rm -rf node_modules && npm run inst && ng serve``

**Clear Watchlist**

``watch-reset`` Cleans the watch list, in case of ```System Limit``` error


**IPFS Deploy**

System Requirements: **Memory** 3.75GB **Storage** 6GB **NodeJS** 14 **NPM** 6 **IPFS** 0.6

`ipfs daemon & npm run ipfs`

`ipfs pin add <CID>`

If you have trouble getting the directory discovered by gateways, you can try ```./ipfs-propagate.sh``` from the root of this repository.
Keep in mind that the bundled web application is >14MB alone without assets, please be patient until we have a preloader.




We added an example ```swarm.json``` to the ```src/app``` folder with an example node to make reproduction easier, but we strongly recommend to use our [Quest CLI](quest-cli) to test and build the app.

Pro Tip: Put a file in your `/bin` that runs the quest-cli like so `node /path/to/quest-cli/index.js` from any folder on your system. It's much nicer!

