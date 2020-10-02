
# QuestNetwork/qd-social-ts

See our documentation for the QuestNetwork/qd-social-ts Reference.`
# QuestNetwork/quest-os-js

## system

### async boot(config)

Boots the operating system. The GitHub branches master/0.9.2/0.9.3+ boot with:

JavaScript/NodeJS
```javascript
import { qOS } from '@questnetwork/quest-os-js'
// configure with a bootstrap swarm peer, for testing you can use:
let config = {
  ipfs: { swarm: [<swarm star peer ip>,<swarm star peer ip>] },
  version: <version>
  dev: <true/false>
};
// boot the operating system
qOS.boot().then( () => {
  //the operating system is online, build the future
})
```

TypeScript/Angular Service
```javascript
import { Injectable } from '@angular/core';
import { qOS }  from '@questnetwork/quest-os-js';
import * as swarmJson from '../swarm.json';
import  packageJson from '../../../package.json';
const version = packageJson.version;

@Injectable({
  providedIn: 'root'
})
export class QuestOSService {
  public os;
  ready = false;
  config;
  constructor() {
    this.config = {
      ipfs: {
        swarm: swarmJson['ipfs']['swarm']
      },
      version: version,
      dev: swarmJson['dev']
    };
    this.os = qOS;
  }
  async boot(){
      try{
        await this.os.boot(this.config);
        this.ready = true;
      }
      catch(e){
        throw(e);
      }
  }
}
```

### isReady()

Returns true once boot is complete, otherwise returns false.

```javascript
if(<os>.isReady()){
  console.log("Ready To Sign In");
};
```


### onReady()

Returns a Subject that pushes next when boot is complete

```javascript
if(<os>.onReady().subsribe( () => {
  console.log("Ready To Sign In");
});
```


### reboot()

Reboots the entire system

```javascript
<os>.reboot();
```

### enableSaveLock() 
[![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js)

Locks the system from saving any changes
```
<os>.enableSaveLock();
```

### disableSaveLock() 
[![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js)

Unlocks the system from saving changes and saves changes normally
```javascript
<os>.disableSaveLock();
```


### setStorageLocation(location)
[![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js)

Sets the storage location for the app. Normally Quest OS does this automatically and you do not need to call this function.
Possible locations are: `"Download"`,`"LocalStorage"` or `"ConfigFile"`

```javascript
<os>.setStorageLocation("LocalStorage");
```

### getStorageLocation(location)
[![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js)

Returns a string with the current storage location

```javascript
<os>.getStorageLocation();
```

### signIn(config = {})
[![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js)

Activates Accounts. Empty config creates a new account
```javascript
<os>.signIn({});
```
### signOut()
[![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js)

Deactivates Accounts And Restarts The Interface On The Web, Closes The Current Window In Electron
```javascript
<os>.signOut();
```

### onSignIn()
[![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js)

Returns a subscribable Subject that fires when the account is signed in.
```javascript
<os>.onSignIn().subscribe( () => {
  console.log("Hello Universe");
});
```

### isSignedIn()
[![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js)

Returns a boolean true or false
```javascript
if(<os>.isSignedIn()){
  console.log("Hello Universe");
};
```

## channel

### async channel.create(dirtyChannelName, parentFolderId = "")
[![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js) [![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js)

Returns the clean channel name
```javascript
let claenChannelName = await <os>.channel.create('propaganda');
```

### channel.remove(cleanChannelName)
[![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js) [![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js)

Removes a channel
```javascript
<os>.channel.remove('propaganda----1234');
```

### channel.listen(cleanChannelName)
[![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js)

Returns a Subject that forwards non-system channel messages.
```javascript
<os>.channel.listen('propaganda----1234').subscribe( msg ){
  console.log(msg);
}
```

### async channel.publish(cleanChannelName, message, type = 'CHANNEL_MESSAGE')
[![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js)

Returns a Subject that forwards non-system channel messages.
```javascript
await <os>.channel.publish('propaganda----1234',"Hello Universe");
```

### channel.challenge.enable(cleanChannelName)  
[![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js)

Opens the channel to everyone who can solve the Captcha provided by [Quest Image Captcha JS](quest-image-captcha-js)
```javascript
<os>.channel.challenge.enable('propaganda----1234');
```

### channel.challenge.disable(cleanChannelName)
[![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js)

Closes the channel to invite only participation
```javascript
<os>.channel.challenge.disable('propaganda----1234');
```

### channel.challenge.isEnabled(cleanChannelName)  
[![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js)

```javascript
if(<os>.isEnabled()){
  console.log("Hello Universe");
};
```

### channel.invite.create(cleanChannelName,newInviteCodeMax, exportFolders = false)  
[![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js) [![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js)

Creates a new channel invite, specify max uses of this invite code and whether or not to include your folder structure.
```
<os>.channel.invite.create('propaganda----1234',5,true);
```

### channel.invite.remove(cleanChannelName,link)
[![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js) [![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js)

Removes a channel invite
```javascript
<os>.channel.invite.remove('propaganda----1234',"5448495320495320414e2045585452454d454c59204c4f4e4720414e4420494e56414c494420494e5649544520434f4445");
```

### channel.invite.get(channel)
[![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js)

Gets all invites for a channel
```javascript
let invites = <os>.channel.invite.get('propaganda----1234');
```


### channel.invite.get(channel)
[![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js)

Gets all invites for a channel
```javascript
let invites = <os>.channel.invite.get('propaganda----1234');
```

## social

### social.togglePrivacy(profilePubKey = 'NoProfileSelected')
[![Social](https://img.shields.io/badge/process-Social-green)](quest-social-js) [![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js) [![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js) 

Toggles your profile's visibility between private and public, not giving a pubKey will automatically select your first profile. 
In private mode you have to manually share your profile with everyone you want to see your details. In Public mode all the members of the channels you're in can see your profile.

```javascript
<os>.social.togglePrivacy();
```

### social.isPublic(socialPubKey = 'NoProfileSelected')
[![Social](https://img.shields.io/badge/process-Social-green)](quest-social-js) [![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js) [![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js) 

Checks if a profile has public visibility, not giving a pubKey will automatically select your first profile. 

```javascript
if(<os>.social.isPublic(socialPubKey)){
  console.log("Hello Universe");
};
```

### social.isFavoite(socialPubKey)
[![Social](https://img.shields.io/badge/process-Social-green)](quest-social-js) [![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js) [![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js) 

Checks if a profile is in our favorites, returns boolean true or false.

```javascript
if(<os>.social.isFavoite(socialPubKey)){
  console.log("Hello Universe");
};
```

### social.isRequestedFavoite(socialPubKey)
[![Social](https://img.shields.io/badge/process-Social-green)](quest-social-js) [![Bee](https://img.shields.io/badge/process-Bee-yellow)](quest-bee-js) [![Ocean](https://img.shields.io/badge/process-Ocean-blue)](quest-ocean-js) 

Checks if a profile is a requested favorite, returns boolean true or false.

```javascript
if(<os>.social.isRequestedFavoite(socialPubKey)){
  console.log("Hello Universe");
};
```


**Unfortunately nobody is working on a detailed QuestNetwork/quest-os-js documentation yet, until then check out the source in [qDesk Messages](quest-messenger-js) 0.9.3+ to see how to use the OS.**

We recommend to use our [quest-cli](quest-cli) to test and build the package. It allows you to bootstrap your Quest Network apps with the same peers and settings.

Pro Tip: Put a file in your `/bin` that runs the quest-cli like so `node /path/to/quest-cli/index.js` from any folder on your system. It's much nicer!
