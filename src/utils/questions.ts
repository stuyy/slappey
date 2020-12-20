/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { PromptObject } from "prompts";
import symbols from "log-symbols";

export const questions: Array<PromptObject> = [
  {
    type: "select",
    name: "option",
    message: "What would you like to do?",
    choices: [
      {
        title: "New",
        description: "Create a new Discord.JS Project",
        value: "new",
      },
      {
        title: "Generate",
        description: "Generate a command or event",
        value: "gen",
      },
    ],
  },
  {
    type: (prev) => (prev === "new" ? "text" : null),
    name: "data",
    message: "Enter the name for your project",
    validate: (value: string) =>
      value.length === 0
        ? `${symbols.warning} Project name cannot be empty!`
        : true,
  },
  {
    type: (prev) => (prev === "gen" ? "select" : null),
    name: "data",
    message: "What would you like to generate?",
    choices: [
      {
        title: "Command",
        value: "command",
        description: "Generate a command?",
      },
      { title: "Event", value: "event", description: "Generate an event?" },
    ],
  },
];

export const versionSelect: Array<PromptObject> = [
  {
    type: "select",
    name: "version",
    message: "Select a version",
    choices: [
      {
        title: "Latest",
        value: "latest",
        description: "Install the latest version of Discord.JS v12",
      },
      {
        title: "v11.6.4",
        value: "11.6.4",
        description: "Install Discord.JS v11.6.4",
      },
    ],
  },
];

export const packageManager: Array<PromptObject> = [
  {
    type: "select",
    name: "packageManager",
    message: "Select a Package Manager",
    choices: [
      {
        title: "yarn",
        value: "yarn",
      },
      {
        title: "npm",
        value: "npm",
      },
    ],
  },
];

export const languageSelect: Array<PromptObject> = [
  {
    type: "select",
    name: "language",
    message: "Select a language",
    choices: [
      { title: "TypeScript", value: "typescript" },
      { title: "JavaScript", value: "javascript" },
    ],
  },
];

export const updateChoice: Array<PromptObject> = [
  {
    type: "select",
    name: "update",
    message: "Yes or No",
    choices: [
      { title: "Yes", value: "yes" },
      { title: "No", value: "no" },
    ],
  },
];

export const getCredentials: Array<PromptObject> = [
  {
    type: "password",
    name: "token",
    message: "Enter your token",
    validate: (value: string) =>
      value.length === 0 ? "Cannot be empty" : true,
  },
  {
    type: "text",
    name: "prefix",
    message: "Enter your prefix",
    validate: (value: string) =>
      value.length === 0 ? "Cannot be empty" : true,
  },
];

export const getCommandPrompt: Array<PromptObject> = [
  {
    type: "text",
    name: "name",
    message: "Enter the name of the command",
  },
  {
    type: "text",
    name: "category",
    message: "Enter the category of the command",
  },
];

export const setupTypescript: PromptObject = {
  type: "confirm",
  name: "value",
  message:
    "Install TypeScript, ts-node, and setup tsconfig.json? You'll have to do this later if you skip this.",
  initial: true,
};

export const eventGenerate: Array<PromptObject> = [
  {
    type: "autocompleteMultiselect",
    name: "events",
    message: "Which event(s) would you like to generate?",
    choices: [
      { title: "CHANNEL_CREATE", value: "channelCreate" },
      { title: "CHANNEL_DELETE", value: "channelDelete" },
      { title: "CHANNEL_PINS_UPDATE", value: "channelPinsUpdate" },
      { title: "CHANNEL_UPDATE", value: "channelUpdate" },
      { title: "DEBUG", value: "debug" },
      { title: "EMOJI_CREATE", value: "emojiCreate" },
      { title: "EMOJI_DELETE", value: "emojiDelete" },
      { title: "EMOJI_UPDATE", value: "emojiUpdate" },
      { title: "ERROR", value: "error" },
      { title: "GUILD_BAN_ADD", value: "guildBanAdd" },
      { title: "GUILD_BAN_REMOVE", value: "guildBanRemove" },
      { title: "GUILD_CREATE", value: "guildCreate" },
      { title: "GUILD_DELETE", value: "guildDelete" },
      { title: "GUILD_INTEGRATIONS_UPDATE", value: "guildIntegrationsUpdate" },
      { title: "GUILD_MEMBER_ADD", value: "guildMemberAdd" },
      { title: "GUILD_MEMBER_REMOVE", value: "guildMemberRemove" },
      { title: "GUILD_MEMBERS_CHUNK", value: "guildMembersChunk" },
      { title: "GUILD_MEMBERS_SPEAKING", value: "guildMembersSpeaking" },
      { title: "GUILD_MEMBER_UPDATE", value: "guildMemberUpdate" },
      { title: "GUILD_UNAVAILABLE", value: "guildUnavailable" },
      { title: "GUILD_UPDATE", value: "guildUpdate" },
      { title: "MESSAGE", value: "message" },
      { title: "MESSAGE_DELETE", value: "messageDelete" },
      { title: "MESSAGE_DELETE_BULK", value: "messageDeleteBulk" },
      { title: "MESSAGE_REACTION_ADD", value: "messageReactionAdd" },
      { title: "MESSAGE_REACTION_REMOVE", value: "messageReactionRemove" },
      {
        title: "MESSAGE_REACTION_REMOVE_ALL",
        value: "messageReactionRemoveAll",
      },
      {
        title: "MESSAGE_REACTION_REMOVE_EMOJI",
        value: "messageReactionRemoveEmoji",
      },
      { title: "MESSAGE_UPDATE", value: "messageUpdate" },
      { title: "PRESENCE_UPDATE", value: "presenceUpdate" },
      { title: "RATE_LIMIT", value: "rateLimit" },
      { title: "READY", value: "ready" },
      { title: "ROLE_CREATE", value: "roleCreate" },
      { title: "ROLE_DELETE", value: "roleDelete" },
      { title: "ROLE_UPDATE", value: "roleUpdate" },
      { title: "SHARD_DISCONNECT", value: "shardDisconnect" },
      { title: "SHARD_ERROR", value: "shardError" },
      { title: "SHARD_READY", value: "shardReady" },
      { title: "SHARD_RECONNECTING", value: "shardReconnecting" },
      { title: "SHARD_RESUME", value: "shardResume" },
      { title: "TYPING_START", value: "typingStart" },
      { title: "USER_UPDATE", value: "userUpdate" },
      { title: "VOICE_STATE_UPDATE", value: "voiceStateUpdate" },
      { title: "WARN", value: "warn" },
      { title: "WEBHOOK_UPDATE", value: "webhookUpdate" },
    ],
    hint: "- Space to select. Return to submit",
  },
];
