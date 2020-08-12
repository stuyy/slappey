const eventTemplatesAkairo = {
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
  emojiDelete: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-emojiDelete\n
    import {Listener} from "discord-akairo";

    class EmojiDeleteEvent extends Listener {
        constructor(){
            super('emojiDelete', {
                event: 'emojiDelete',
                emitter: 'client'
            })
        }

        exec(emoji){
            
        }
    }

    module.exports = EmojiDeleteEvent
    `,
  emojiUpdate: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-emojiUpdate\n
    import {Listener} from "discord-akairo";

    class emojiUpdateEvent extends Listener {
        constructor(){
            super('emojiUpdate', {
                event: 'emojiUpdate',
                emitter: 'client'
            })
        }

        exec(old, new){
            
        }
    }

    module.exports = emojiUpdateEvent;
    `,
  error: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-error\n
    import {Listener} from "discord-akairo";

    class errorEvent extends Listener {
        constructor(){
            super('error', {
                event: 'error',
                emitter: 'client'
            })
        }

        exec(error){
            
        }
    }

    module.exports = errorEvent
    `,
  guildBanAdd: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildBanAdd\n
    import {Listener} from "discord-akairo";

    class guildBanAddEvent extends Listener {
        constructor(){
            super('guildBanAdd', {
                event: 'guildBanAdd',
                emitter: 'client'
            })
        }

        exec(guild, user){
            
        }
    }

    module.exports = guildBanAddEvent
    `,
  guildBanRemove: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildBanRemove\n
    import {Listener} from "discord-akairo";

    class guildBanRemoveEvent extends Listener {
        constructor(){
            super('guildBanRemove', {
                event: 'guildBanRemove',
                emitter: 'client'
            })
        }

        exec(guild, user){
            
        }
    }

    module.exports = guildBanUserEvent
    `,
  guildCreate: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate\n
    import {Listener} from "discord-akairo";

    class guildCreateEvent extends Listener {
        constructor(){
            super('guildCreate', {
                event: 'guildCreate',
                emitter: 'client'
            })
        }

        exec(guild){
            
        }
    }

    module.exports = guildCreateEvent
    `,
  guildDelete: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete\n
    import {Listener} from "discord-akairo";

    class guildDeleteEvent extends Listener {
        constructor(){
            super('guildDelete', {
                event: 'guildDelete',
                emitter: 'client'
            })
        }

        exec(guild){
            
        }
    }

    module.exports = guildDelete
    `,
  guildIntegrationsUpdate: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildIntegrationsUpdate\n
    import {Listener} from "discord-akairo";

    class guildIntegrationsUpdateEvent extends Listener {
        constructor(){
            super('guildIntegrationsUpdate', {
                event: 'guildIntegrationsUpdate',
                emitter: 'client'
            })
        }

        exec(guild){
            
        }
    }

    module.exports = guildIntegrationsUpdate
    `,
  guildMemberAdd: `
    // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd\n
    import {Listener} from "discord-akairo";

    class guildMemberAddEvent extends Listener {
        constructor(){
            super('guildMemberAdd', {
                event: 'guildMemberAdd',
                emitter: 'client'
            })
        }

        exec(member){
            
        }
    }

    module.exports = guildMemberAddEvent
`,
  guildMemberRemove: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove\n
import {Listener} from "discord-akairo";

    class guildMemberRemoveEvent extends Listener {
        constructor(){
            super('guildMemberRemove', {
                event: 'guildMemberRemove',
                emitter: 'client'
            })
        }

        exec(member){
            
        }
    }

    module.exports =  guildMemberRemoveEvent
`,
  guildMembersChunk: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMembersChunk\n
import {Listener} from "discord-akairo";

    class guildMembersChunkEvent extends Listener {
        constructor(){
            super('guildMembersChunk', {
                event: 'guildMembersChunk',
                emitter: 'client'
            })
        }

        exec(members, guild){
            
        }
    }

    module.exports = guildMembersChunkEvent
`,
  guildMemberSpeaking: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberSpeaking\n
import {Listener} from "discord-akairo";

    class guildMemberSpeakingEvent extends Listener {
        constructor(){
            super('guildMemberSpeaking', {
                event: 'guildMemberSpeaking',
                emitter: 'client'
            })
        }

        exec(member, speaking){
            
        }
    }

    module.exports = guildMemberSpeakingEvent
`,
  guildMemberUpdate: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberUpdate\n
import {Listener} from "discord-akairo";

    class guildMemberUpdate extends Listener {
        constructor(){
            super('', {
                event: '',
                emitter: 'client'
            })
        }

        exec(old, new){
            
        }
    }

    module.exports = 
`,
  guildUnavailable: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildUnavailable\n
import {Listener} from "discord-akairo";

    class guildUnavailableEvent extends Listener {
        constructor(){
            super('guildUnavailable', {
                event: 'guildUnavailable',
                emitter: 'client'
            })
        }

        exec(guild){
            
        }
    }

    module.exports = guildUnavailable
`,
  guildUpdate: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildUpdate\n
import {Listener} from "discord-akairo";

    class guildUpdateEvent extends Listener {
        constructor(){
            super('guildUpdate', {
                event: 'guildUpdate',
                emitter: 'client'
            })
        }

        exec(old, new){
            
        }
    }

    module.exports = guildUpdate
`,
  invalidated: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-invalidated\n
import {Listener} from "discord-akairo";

    class invalidatedEvent extends Listener {
        constructor(){
            super('invalidated', {
                event: 'invalidated',
                emitter: 'client'
            })
        }

        exec(){
            
        }
    }

    module.exports = invalidatedEvent
`,
  inviteCreate: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-inviteCreate\n
import {Listener} from "discord-akairo";

    class inviteCreateEvent extends Listener {
        constructor(){
            super('inviteCreate', {
                event: 'inviteCreate',
                emitter: 'client'
            })
        }

        exec(invite){
            
        }
    }

    module.exports = inviteCreateEvent;
`,
  inviteDelete: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-inviteDelete\n
import {Listener} from "discord-akairo";

    class inviteDeleteEvent extends Listener {
        constructor(){
            super('inviteDelete', {
                event: 'inviteDelete',
                emitter: 'client'
            })
        }

        exec(invite){
            
        }
    }

    module.exports = inviteDeleteEvent
`,
  message: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message\n
import {Listener} from "discord-akairo";

    class messageEvent extends Listener {
        constructor(){
            super('message', {
                event: 'message',
                emitter: 'client'
            })
        }

        exec(message){
            
        }
    }

    module.exports = messageEvent 
`,
  messageDelete: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete\n
import {Listener} from "discord-akairo";

    class messageDeleteEvent extends Listener {
        constructor(){
            super('messageDelete', {
                event: 'messageDelete',
                emitter: 'client'
            })
        }

        exec(message){
        
        }
    }

    module.exports = messageDeleteEvent
`,
  messageDeleteBulk: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDeleteBulk\n
import {Listener} from "discord-akairo";

    class messageDeleteBulkEvent extends Listener {
        constructor(){
            super('messageDeleteBulkEvent', {
                event: 'messageDeleteBulk',
                emitter: 'client'
            })
        }

        exec(messages){
            
        }
    }

    module.exports = messageDeleteBulkEvent
`,
  messageReactionAdd: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd\n
import {Listener} from "discord-akairo";

    class messageReactionAddEvent extends Listener {
        constructor(){
            super('messageReactAdd', {
                event: 'messageReactionAdd',
                emitter: 'client'
            })
        }

        exec(reaction, user){
            
        }
    }

    module.exports = messageReactionAddEvent
`,
  messageReactionRemove: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemove\n
import {Listener} from "discord-akairo";

    class messageReactionRemoveEvent extends Listener {
        constructor(){
            super('messageReactionRemove', {
                event: 'messageReactionRemove',
                emitter: 'client'
            })
        }

        exec(reaction, user){
            
        }
    }

    module.exports = messageReactionRemoveEvent
`,
  messageReactionRemoveAll: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemoveAll\n
import {Listener} from "discord-akairo";

    class messageReactionRemoveAllEvent extends Listener {
        constructor(){
            super('messageReactionRemoveAll', {
                event: 'messageReactionRemoveAll',
                emitter: 'client'
            })
        }

        exec(message){
            
        }
    }

    module.exports = messageReactionRemoveAllEvent
`,
  messageReactionRemoveEmoji: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemoveEmoji\n
import {Listener} from "discord-akairo";

    class messageReactionRemoveEmojiEvent extends Listener {
        constructor(){
            super('messageReactionRemoveEmoji', {
                event: 'messageReactionRemoveEmoji',
                emitter: 'client'
            })
        }

        exec(reaction){
            
        }
    }

    module.exports =  messageReactionRemoveEmojiEvent
`,
  messageUpdate: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate\n
import {Listener} from "discord-akairo";

    class messageUpdateEvent extends Listener {
        constructor(){
            super('messageUpdate', {
                event: 'messageUpdate',
                emitter: 'client'
            })
        }

        exec(old, new){
            
        }
    }

    module.exports = messageUpdateEvent
`,
  presenceUpdate: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-presenceUpdate\n
import {Listener} from "discord-akairo";

    class presenceUpdateEvent extends Listener {
        constructor(){
            super('presenceUpdate', {
                event: 'presenceUpdate',
                emitter: 'client'
            })
        }

        exec(old, new){
            
        }
    }

    module.exports =  presenceUpdate;
`,
  rateLimit: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-rateLimit\n
import {Listener} from "discord-akairo";

    class rateLimitInfo extends Listener {
        constructor(){
            super('rateLimit', {
                event: 'rateLimit',
                emitter: 'client'
            })
        }

        exec(rateLimitInfo){
            
        }
    }

    module.exports = rateLimitIEvent
`,
  ready: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-ready\n
import {Listener} from "discord-akairo";

    class readyEvent extends Listener {
        constructor(){
            super('ready', {
                event: 'ready',
                emitter: 'client'
            })
        }

        exec(){
            
        }
    }

    module.exports = readyEvent
`,
  roleCreate: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleCreate\n
import {Listener} from "discord-akairo";

    class roleCreateEvent extends Listener {
        constructor(){
            super('roleCreate', {
                event: 'roleCreate',
                emitter: 'client'
            })
        }

        exec(role){
            
        }
    }

    module.exports = roleCreateEvent
`,
  roleDelete: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleDelete\n
import {Listener} from "discord-akairo";

    class roleDeleteEvent extends Listener {
        constructor(){
            super('roleDelete', {
                event: 'roleDeleteEvent',
                emitter: 'client'
            })
        }

        exec(role){
            
        }
    }

    module.exports = roleDeleteEvent
`,
  roleUpdate: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleUpdate\n
import {Listener} from "discord-akairo";

    class roleUpdateEvent extends Listener {
        constructor(){
            super('roleUpdate', {
                event: 'roleUpdate',
                emitter: 'client'
            })
        }

        exec(old, new){
            
        }
    }

    module.exports = roleUpdate
`,
  shardDisconnect: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-shardDisconnect\n
import {Listener} from "discord-akairo";

    class shardDisconnectEvent extends Listener {
        constructor(){
            super('shardDisconnect', {
                event: 'shardDisconnect',
                emitter: 'client'
            })
        }

        exec(event, id){
            
        }
    }

    module.exports = shardDisconnectEvent
`,
  shardError: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-shardError\n
import {Listener} from "discord-akairo";

    class shardErrorEvent extends Listener {
        constructor(){
            super('shardError', {
                event: 'shardError',
                emitter: 'client'
            })
        }

        exec(error, id){
            
        }
    }

    module.exports = shardErrorEvent
`,
  shardReady: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-shardReady\n
import {Listener} from "discord-akairo";

    class shardReadyEvent extends Listener {
        constructor(){
            super('shardReady', {
                event: 'shardReady',
                emitter: 'client'
            })
        }

        exec(id, unavailableGuilds){
            
        }
    }

    module.exports = shardReadyEvent
`,
  shardReconnecting: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-shardReconnecting\n
import {Listener} from "discord-akairo";

    class shardReconnectionEvent extends Listener {
        constructor(){
            super('shardReconnecting', {
                event: 'shardReconnecting',
                emitter: 'client'
            })
        }

        exec(id){
            
        }
    }

    module.exports = shardReconnectingEvent
`,
  shardResume: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-shardResume\n
import {Listener} from "discord-akairo";

    class shardResumeEvent extends Listener {
        constructor(){
            super('shardResume', {
                event: 'shardResume',
                emitter: 'client'
            })
        }

        exec(id, replayedEvents){
            
        }
    }

    module.exports = shardResumeEvent
`,
  typingStart: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-typingStart\n
import {Listener} from "discord-akairo";

    class typingStartEvent extends Listener {
        constructor(){
            super('typingStart', {
                event: 'typingStart',
                emitter: 'client'
            })
        }

        exec(channel, user){
            
        }
    }

    module.exports = typingStartEvent
`,
  userUpdate: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-userUpdate\n
import {Listener} from "discord-akairo";

    class userUpdateEvent extends Listener {
        constructor(){
            super('userUpdate', {
                event: 'userUpdate',
                emitter: 'client'
            })
        }

        exec(old, new){
            
        }
    }

    module.exports = userUpdateEvent
`,
  voiceStateUpdate: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate\n
import {Listener} from "discord-akairo";

    class voiceStateUpdateEvent extends Listener {
        constructor(){
            super('voiceStateUpdate', {
                event: 'voiceStateUpdate',
                emitter: 'client'
            })
        }

        exec(old, new){ 
            
        }
    }

    module.exports = voiceStateUpdateEvent
`,
  warn: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-warn\n
import {Listener} from "discord-akairo";

    class warnEvent extends Listener {
        constructor(){
            super('', {
                event: '',
                emitter: 'client'
            })
        }

        exec(info){
            
        }
    }

    module.exports = warnEvent
`,
  webhookUpdate: `
// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-webhookUpdate\n
import {Listener} from "discord-akairo";

    class webhookUpdateEvent extends Listener {
        constructor(){
            super('webhookEvent', {
                event: 'webhookEvent',
                emitter: 'client'
            })
        }

        exec(channel){
            
        }
    }

    module.exports = webhookUpdateEvent
`,
};


export default eventTemplatesAkairo;