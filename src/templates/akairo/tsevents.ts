const eventTemplatesAkairoTS = {
  channelCreate: `
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate\n
      import { DMChannel, GuildChannel } from 'discord.js';
      import {Listener} from "discord-akairo";
  
      export default class ChannelCreateEvent extends Listener {
          public constructor(){
              super('channelCreate', {
                  emitter: 'client',
                  event: 'channelCreate'
              })
          }
  
         public exec(channel: DMChannel | GuildChannel){
  
          }
      }
  
      //ChannelCreateEvent; 
      `,
  channelDelete: `// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelDelete\n
      import {Listener} from "discord-akairo";
      import { DMChannel, GuildChannel } from 'discord.js';
      export default class ChannelDeleteEvent extends Listener{
          public constructor(){
              super('channelDelete', {
                  event: 'channelDelete',
                  emitter: 'client'
              })
          }
  
          public exec(channel: DMChannel | GuildChannel){
  
          }
      }  
      //ChannelCreateEvent;
      `,
  channelPinsUpdate: `// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelPinsUpdate\n
      import {Listener} from "discord-akairo";
      import { DMChannel, TextChannel } from 'discord.js';
  
      export default class ChannelPinsUpdateEvent extends Listener {
          public constructor(){
              super('channelPinsUpdate', {
                  event: 'channelPinsUpdate',
                  emitter: 'client'
              })
          }
  
          public exec(channel: DMChannel | TextChannel, time: Date){
  
          }
      }
  
      //ChannelPinsUpdateEvent
      `,
  channelUpdate: `
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelUpdate\n
      import {Listener} from "discord-akairo";
      import { DMChannel, GuildChannel } from 'discord.js';
  
      export default class channelUpdateEvent extends Listener {
          public constructor(){
              super('channelUpdate', {
                  event: 'channelUpdate',
                  emitter: 'client'
              })
          }
  
          public exec(oldChannel: DMChannel | TextChannel, newChannel: DMChannel | TextChannel){
              
          }
      }
  
      //channelUpdateEvent
      `,
  debug: `
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-debug\n
      import {Listener} from "discord-akairo";
  
      export default class DebugEvent extends Listener {
          public constructor(){
              super('debug', {
                  event: 'debug',
                  emitter: 'client'
              })
          }
  
          public exec(info: string){
              
          }
      }
  
      //DebugEvent
      `,
  emojiCreate: `
    import { GuildEmoji } from 'discord.js';
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-emojiCreate\n
      import {Listener} from "discord-akairo";
  
      export default class EmojiCreateEvent extends Listener {
          public constructor(){
              super('emojiCreate', {
                  event: 'emojiCreate',
                  emitter: 'client'
              })
          }
  
          public exec(emoji: GuildEmoji){
              
          }
      }
  
      //EmojiCreateEvent
      `,
  emojiDelete: `
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-emojiDelete\n
      import {Listener} from "discord-akairo";
      import { GuildEmoji } from 'discord.js';
  
      export default class EmojiDeleteEvent extends Listener {
          public constructor(){
              super('emojiDelete', {
                  event: 'emojiDelete',
                  emitter: 'client'
              })
          }
  
          public exec(emoji: GuildEmoji){
              
          }
      }
  
      //EmojiDeleteEvent
      `,
  emojiUpdate: `
    
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-emojiUpdate\n
      import {Listener} from "discord-akairo";
      import { GuildEmoji } from 'discord.js';
      export default class emojiUpdateEvent extends Listener {
          public constructor(){
              super('emojiUpdate', {
                  event: 'emojiUpdate',
                  emitter: 'client'
              })
          }
  
          public exec(old: guildEmoji, new: guildEmoji){
              
          }
      }
  
      //emojiUpdateEvent;
      `,
  error: `
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-error\n
      import {Listener} from "discord-akairo";
  
      export default class errorEvent extends Listener {
          public constructor(){
              super('error', {
                  event: 'error',
                  emitter: 'client'
              })
          }
  
          public exec(error: Error){
              
          }
      }
  
      //errorEvent
      `,
  guildBanAdd: `
    import { Guild, User } from 'discord.js';
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildBanAdd\n
      import {Listener} from "discord-akairo";
  
      export default class guildBanAddEvent extends Listener {
          public constructor(){
              super('guildBanAdd', {
                  event: 'guildBanAdd',
                  emitter: 'client'
              })
          }
  
          public exec(guild: Guild, user: User){
              
          }
      }
  
      //guildBanAddEvent
      `,
  guildBanRemove: `
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildBanRemove\n
      import {Listener} from "discord-akairo";
      import { Guild, User } from 'discord.js';
  
      export default class guildBanRemoveEvent extends Listener {
          public constructor(){
              super('guildBanRemove', {
                  event: 'guildBanRemove',
                  emitter: 'client'
              })
          }
  
          public exec(guild: Guild, user: User){
              
          }
      }
  
      //guildBanUserEvent
      `,
  guildCreate: `
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate\n
      import { Guild } from 'discord.js';
      import {Listener} from "discord-akairo";
  
      export default class guildCreateEvent extends Listener {
          public constructor(){
              super('guildCreate', {
                  event: 'guildCreate',
                  emitter: 'client'
              })
          }
  
          public exec(guild: Guild){
              
          }
      }
  
      //guildCreateEvent
      `,
  guildDelete: `
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete\n
      import {Listener} from "discord-akairo";
      import { Guild } from 'discord.js';
  
      export default class guildDeleteEvent extends Listener {
          public constructor(){
              super('guildDelete', {
                  event: 'guildDelete',
                  emitter: 'client'
              })
          }
  
          public exec(guild: Guild){
              
          }
      }
  
      //guildDelete
      `,
  guildIntegrationsUpdate: `
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildIntegrationsUpdate\n
      import {Listener} from "discord-akairo";
      import { Guild } from 'discord.js';
  
      export default class guildIntegrationsUpdateEvent extends Listener {
          public constructor(){
              super('guildIntegrationsUpdate', {
                  event: 'guildIntegrationsUpdate',
                  emitter: 'client'
              })
          }
  
          public exec(guild: Guild){
              
          }
      }
  
      //guildIntegrationsUpdate
      `,
  guildMemberAdd: `
      // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd\n
      import {Listener} from "discord-akairo";
      import {GuildMember} from "discord.js"
  
      export default class guildMemberAddEvent extends Listener {
          public constructor(){
              super('guildMemberAdd', {
                  event: 'guildMemberAdd',
                  emitter: 'client'
              })
          }
  
          public exec(member: GuildMember){
              
          }
      }
  
      //guildMemberAddEvent
  `,
  guildMemberRemove: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove\n
  import {Listener} from "discord-akairo";
  import {GuildMember} from "discord.js"
  
      export default class guildMemberRemoveEvent extends Listener {
          public constructor(){
              super('guildMemberRemove', {
                  event: 'guildMemberRemove',
                  emitter: 'client'
              })
          }
  
          public exec(member: GuildMember){
              
          }
      }
  
      // guildMemberRemoveEvent
  `,
  guildMembersChunk: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMembersChunk\n
  import {Listener} from "discord-akairo";
  import {GuildMember, Guild} from  "discord.js"
  
      export default class guildMembersChunkEvent extends Listener {
          public constructor(){
              super('guildMembersChunk', {
                  event: 'guildMembersChunk',
                  emitter: 'client'
              })
          }
  
          public exec(members: GuildMember, guild: Guild){
              
          }
      }
  
      //guildMembersChunkEvent
  `,
  guildMemberSpeaking: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberSpeaking\n
  import {Listener} from "discord-akairo";
  import {GuildMember} from "discord.js"
  
      export default class guildMemberSpeakingEvent extends Listener {
          public constructor(){
              super('guildMemberSpeaking', {
                  event: 'guildMemberSpeaking',
                  emitter: 'client'
              })
          }
  
          public exec(member: GuildMember, speaking: Readonly<Speaking>){
              
          }
      }
  
      //guildMemberSpeakingEvent
  `,
  guildMemberUpdate: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberUpdate\n
  import {Listener} from "discord-akairo";
  import {GuildMember} from "discord.js"
  
      export default class guildMemberUpdate extends Listener {
          public constructor(){
              super('', {
                  event: '',
                  emitter: 'client'
              })
          }
  
          public exec(old: GuildMember, new: GuildMember){
              
          }
      }
  
      //
  `,
  guildUnavailable: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildUnavailable\n
  import {Listener} from "discord-akairo";
  import {Guild} from 'discord.js';
  
      export default class guildUnavailableEvent extends Listener {
          public constructor(){
              super('guildUnavailable', {
                  event: 'guildUnavailable',
                  emitter: 'client'
              })
          }
  
          public exec(guild: Guild){
              
          }
      }
  
      //guildUnavailable
  `,
  guildUpdate: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildUpdate\n
  import {Listener} from "discord-akairo";
  import { Guild} from "discord.js"
  
      export default class guildUpdateEvent extends Listener {
          public constructor(){
              super('guildUpdate', {
                  event: 'guildUpdate',
                  emitter: 'client'
              })
          }
  
          public exec(old: Guild, new: Guild){
              
          }
      }
  
      //guildUpdate
  `,
  invalidated: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-invalidated\n
  import {Listener} from "discord-akairo";
  
      export default class invalidatedEvent extends Listener {
          public constructor(){
              super('invalidated', {
                  event: 'invalidated',
                  emitter: 'client'
              })
          }
  
          public exec(){
              
          }
      }
  
      //invalidatedEvent
  `,
  inviteCreate: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-inviteCreate\n
  import {Listener} from "discord-akairo";
  import {Invite} from "discord.js"
  
      export default class inviteCreateEvent extends Listener {
          public constructor(){
              super('inviteCreate', {
                  event: 'inviteCreate',
                  emitter: 'client'
              })
          }
  
          public exec(invite: Invite){
              
          }
      }
  
      //inviteCreateEvent;
  `,
  inviteDelete: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-inviteDelete\n
  import {Listener} from "discord-akairo";
import {Invite} from "discord.js"
  
      export default class inviteDeleteEvent extends Listener {
          public constructor(){
              super('inviteDelete', {
                  event: 'inviteDelete',
                  emitter: 'client'
              })
          }
  
          public exec(invite: Inivte){
              
          }
      }
  
      //inviteDeleteEvent
  `,
  message: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message\n
  import {Listener} from "discord-akairo";
  import {Message} from "discord.js"
  
      export default class messageEvent extends Listener {
          public constructor(){
              super('message', {
                  event: 'message',
                  emitter: 'client'
              })
          }
  
          public exec(message: Message){
              
          }
      }
  
      //messageEvent 
  `,
  messageDelete: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete\n
  import {Listener} from "discord-akairo";
  import {Message} from "discord.js"
  
      export default class messageDeleteEvent extends Listener {
          public constructor(){
              super('messageDelete', {
                  event: 'messageDelete',
                  emitter: 'client'
              })
          }
  
          public exec(message: Message){
          
          }
      }
  
      //messageDeleteEvent
  `,
  messageDeleteBulk: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDeleteBulk\n
  import {Listener} from "discord-akairo";
  import {Collection, Snowflake, Message} from "discord.js"
  
      export default class messageDeleteBulkEvent extends Listener {
          public constructor(){
              super('messageDeleteBulkEvent', {
                  event: 'messageDeleteBulk',
                  emitter: 'client'
              })
          }
  
          public exec(messages: Collection<Snowflake, Message>){
              
          }
      }
  
      //messageDeleteBulkEvent
  `,
  messageReactionAdd: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd\n
  import {Listener} from "discord-akairo";
  import {Reaction, User} from "discord.js"
  
      export default class messageReactionAddEvent extends Listener {
          public constructor(){
              super('messageReactAdd', {
                  event: 'messageReactionAdd',
                  emitter: 'client'
              })
          }
  
          public exec(reaction: Reaction, user: User){
              
          }
      }
  
      //messageReactionAddEvent
  `,
  messageReactionRemove: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemove\n
  import {Listener} from "discord-akairo";
  import {Reaction, User} from "discord.js"
  
      export default class messageReactionRemoveEvent extends Listener {
          public constructor(){
              super('messageReactionRemove', {
                  event: 'messageReactionRemove',
                  emitter: 'client'
              })
          }
  
          public exec(reaction: Reaction, user: User){
              
          }
      }
  
      //messageReactionRemoveEvent
  `,
  messageReactionRemoveAll: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemoveAll\n
  import {Listener} from "discord-akairo";
  import {Message} from "discord.js"
  
      export default class messageReactionRemoveAllEvent extends Listener {
          public constructor(){
              super('messageReactionRemoveAll', {
                  event: 'messageReactionRemoveAll',
                  emitter: 'client'
              })
          }
  
          public exec(message: Message){
              
          }
      }
  
      //messageReactionRemoveAllEvent
  `,
  messageReactionRemoveEmoji: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemoveEmoji\n
  import {Listener} from "discord-akairo";
  import {Reaction} from "discord.js"
  
      export default class messageReactionRemoveEmojiEvent extends Listener {
          public constructor(){
              super('messageReactionRemoveEmoji', {
                  event: 'messageReactionRemoveEmoji',
                  emitter: 'client'
              })
          }
  
          public exec(reaction: Reaction){
              
          }
      }
  
      // messageReactionRemoveEmojiEvent
  `,
  messageUpdate: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate\n
  import {Listener} from "discord-akairo";
  import {Message} from "discord.js"
  
      export default class messageUpdateEvent extends Listener {
          public constructor(){
              super('messageUpdate', {
                  event: 'messageUpdate',
                  emitter: 'client'
              })
          }
  
          public exec(old: Message, new: Message){
              
          }
      }
  
      //messageUpdateEvent
  `,
  presenceUpdate: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-presenceUpdate\n
  import {Listener} from "discord-akairo";
  import {Presence} from "discord.js"
  
      export default class presenceUpdateEvent extends Listener {
          public constructor(){
              super('presenceUpdate', {
                  event: 'presenceUpdate',
                  emitter: 'client'
              })
          }
  
          public exec( oldPresence: Presence | null | undefined, newPresence: Presence){
              
          }
      }
  
      // presenceUpdate;
  `,
  rateLimit: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-rateLimit\n
  import {Listener} from "discord-akairo";
  
      export default class rateLimitInfo extends Listener {
          public constructor(){
              super('rateLimit', {
                  event: 'rateLimit',
                  emitter: 'client'
              })
          }
  
interface RateLimitInfo {
    readonly timeout: number;
    readonly limit: number;
    readonly method: string;
    readonly path: string;
    readonly route: string;
  }
          public exec(rateLimitInfo: RateLimitInfo){
              
          }
      }
  
      //rateLimitIEvent
  `,
  ready: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-ready\n
  import {Listener} from "discord-akairo";
  
      export default class readyEvent extends Listener {
          public constructor(){
              super('ready', {
                  event: 'ready',
                  emitter: 'client'
              })
          }
  
          public exec(){
              
          }
      }
  
      //readyEvent
  `,
  roleCreate: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleCreate\n
  import {Listener} from "discord-akairo";
  import {Role} from "discord.js"
      export default class roleCreateEvent extends Listener {
          public constructor(){
              super('roleCreate', {
                  event: 'roleCreate',
                  emitter: 'client'
              })
          }
  
          public exec(role: Role){
              
          }
      }
  
      //roleCreateEvent
  `,
  roleDelete: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleDelete\n
  import {Listener} from "discord-akairo";
  import {Role} from "discord.js"
  
      export default class roleDeleteEvent extends Listener {
          public constructor(){
              super('roleDelete', {
                  event: 'roleDeleteEvent',
                  emitter: 'client'
              })
          }
  
          public exec(role: Role){
              
          }
      }
  
      //roleDeleteEvent
  `,
  roleUpdate: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleUpdate\n
  import {Listener} from "discord-akairo";
  import {Role} from "discord.js"
  
      export default class roleUpdateEvent extends Listener {
          public constructor(){
              super('roleUpdate', {
                  event: 'roleUpdate',
                  emitter: 'client'
              })
          }
  
          public exec(old: Role, new: Role){
              
          }
      }
  
      //roleUpdate
  `,
  shardDisconnect: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-shardDisconnect\n
  import {Listener} from "discord-akairo";
  
      export default class shardDisconnectEvent extends Listener {
          public constructor(){
              super('shardDisconnect', {
                  event: 'shardDisconnect',
                  emitter: 'client'
              })
          }
  
          public exec(event: CloseEvent, id: number){
              
          }
      }
  
      //shardDisconnectEvent
  `,
  shardError: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-shardError\n
  import {Listener} from "discord-akairo";
  
      export default class shardErrorEvent extends Listener {
          public constructor(){
              super('shardError', {
                  event: 'shardError',
                  emitter: 'client'
              })
          }
  
          public exec(error: Error, id: number){
              
          }
      }
  
      //shardErrorEvent
  `,
  shardReady: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-shardReady\n
  import {Listener} from "discord-akairo";
  
      export default class shardReadyEvent extends Listener {
          public constructor(){
              super('shardReady', {
                  event: 'shardReady',
                  emitter: 'client'
              })
          }
  
          public exec(id: number, unavailableGuilds?: Set<string>){
              
          }
      }
  
      //shardReadyEvent
  `,
  shardReconnecting: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-shardReconnecting\n
  import {Listener} from "discord-akairo";
  
      export default class shardReconnectionEvent extends Listener {
          public constructor(){
              super('shardReconnecting', {
                  event: 'shardReconnecting',
                  emitter: 'client'
              })
          }
  
          public exec(id: number){
              
          }
      }
  
      //shardReconnectingEvent
  `,
  shardResume: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-shardResume\n
  import {Listener} from "discord-akairo";
  
      export default class shardResumeEvent extends Listener {
          public constructor(){
              super('shardResume', {
                  event: 'shardResume',
                  emitter: 'client'
              })
          }
  
          public exec(id: number, replayedEvents: number){
              
          }
      }
  
      //shardResumeEvent
  `,
  typingStart: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-typingStart\n
  import {Listener} from "discord-akairo";
   import {Channel, User} from "discord.js"
  
      export default class typingStartEvent extends Listener {
          public constructor(){
              super('typingStart', {
                  event: 'typingStart',
                  emitter: 'client'
              })
          }
  
          public exec(channel: Channel, user: User){
              
          }
      }
  
      //typingStartEvent
  `,
  userUpdate: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-userUpdate\n
  import {Listener} from "discord-akairo";
  import {User} from "discord.js"
      export default class userUpdateEvent extends Listener {
          public constructor(){
              super('userUpdate', {
                  event: 'userUpdate',
                  emitter: 'client'
              })
          }
  
          public exec(old: User, new: User){
              
          }
      }
  
      //userUpdateEvent
  `,
  voiceStateUpdate: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate\n
  import {VoiceState } from "discord.js"
  import {Listener} from "discord-akairo";
  
      export default class voiceStateUpdateEvent extends Listener {
          public constructor(){
              super('voiceStateUpdate', {
                  event: 'voiceStateUpdate',
                  emitter: 'client'
              })
          }
  
          public exec(old: VoiceState, new: VoiceState){ 
              
          }
      }
  
      //voiceStateUpdateEvent
  `,
  warn: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-warn\n
  import {Listener} from "discord-akairo";
  
      export default class warnEvent extends Listener {
          public constructor(){
              super('', {
                  event: '',
                  emitter: 'client'
              })
          }
  
          public exec(info: string){
              
          }
      }
  
      //warnEvent
  `,
  webhookUpdate: `
  // https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-webhookUpdate\n
  import {Listener} from "discord-akairo";
  import {TextChannel} from "discord.js"
  
      export default class webhookUpdateEvent extends Listener {
          public constructor(){
              super('webhookEvent', {
                  event: 'webhookEvent',
                  emitter: 'client'
              })
          }
  
          public exec(channel: TextChannel){
              
          }
      }
  
      //webhookUpdateEvent
  `,
};

export default eventTemplatesAkairoTS;