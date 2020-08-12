const eventTemplates = {
  channelCreate: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate\n
    import {Listener} from "discord-akairo";

    class ChannelCreateEvent extends Listener {
        constructor(){
            super('channelCreate', {
                emitter: 'client',
                event: 'channelCreate'
            })
        }

        exec(channel){

        }
    }

    module.exports = ChannelCreateEvent; 
    `,
  channelDelete: `// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelDelete\n
    import {Listener} from "discord-akairo";

    class ChannelDeleteEvent extends Listener{
        constructor(){
            super('channelDelete', {
                event: 'channelDelete',
                emitter: 'client'
            })
        }

        exec(channel){

        }
    }  
    module.exports = ChannelCreateEvent;
    `,
  channelPinsUpdate: `// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelPinsUpdate\n
    import {Listener} from "discord-akairo";

    class ChannelPinsUpdateEvent extends Listener {
        constructor(){
            super('channelPinsUpdate', {
                event: 'channelPinsUpdate',
                emitter: 'client'
            })
        }

        exec(channel, time){

        }
    }

    module.exports = ChannelPinsUpdateEvent
    `,
  channelUpdate: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelUpdate\n
    import {Listener} from "discord-akairo";

    class channelUpdateEvent extends Listener {
        constructor(){
            super('channelUpdate', {
                event: 'channelUpdate',
                emitter: 'client'
            })
        }

        exec(old, new){
            
        }
    }

    module.exports = channelUpdateEvent
    `,
  debug: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-debug\n
    import {Listener} from "discord-akairo";

    class DebugEvent extends Listener {
        constructor(){
            super('debug', {
                event: 'debug',
                emitter: 'client'
            })
        }

        exec(info){
            
        }
    }

    module.exports = DebugEvent
    `,
  emojiCreate: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-emojiCreate\n
    import {Listener} from "discord-akairo";

    class EmojiCreateEvent extends Listener {
        constructor(){
            super('emojiCreate', {
                event: 'emojiCreate',
                emitter: 'client'
            })
        }

        exec(emoji){
            
        }
    }

    module.exports = EmojiCreateEvent
    `,
};
