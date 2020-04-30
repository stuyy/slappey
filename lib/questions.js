"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questions = [
    {
        type: 'select',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            { title: 'New', description: 'Create a new Discord.JS Project', value: 'new' },
            { title: 'Generate', description: 'Generate a command or event', value: 'gen' },
            { title: 'Delete', description: 'Delete a command or event', value: 'del' },
        ],
    },
    {
        type: (prev) => (prev === 'new' ? 'text' : null),
        name: 'data',
        message: 'Enter the name for your project',
    },
    {
        type: (prev) => (prev === 'gen' ? 'select' : null),
        name: 'data',
        message: 'What would you like to generate?',
        choices: [
            { title: 'Command', value: 'command', description: 'Generate a command?' },
            { title: 'Event', value: 'event', description: 'Generate an event?' },
        ],
    },
    {
        type: (prev) => (prev === 'del' ? 'select' : null),
        name: 'data',
        message: 'What would you like to delete?',
        choices: [
            { title: 'Command', value: 'command', description: 'Delete a command?' },
            { title: 'Event', value: 'event', description: 'Delete an event?' },
        ],
    },
];
exports.newProject = [
    {
        type: 'text',
        name: 'name',
        message: 'Enter a name for your project',
    },
];
exports.versionSelect = [
    {
        type: 'select',
        name: 'version',
        message: 'Select a version',
        choices: [
            { title: 'Latest', value: 'latest', description: 'Install the latest version of Discord.JS v12' },
            { title: 'v11.6.4', value: '11.6.4', description: 'Install Discord.JS v11.6.4' },
        ],
    },
];
exports.getCredentials = [
    {
        type: 'invisible',
        name: 'token',
        message: 'Enter your token',
    },
    {
        type: 'text',
        name: 'prefix',
        message: 'Enter your prefix',
    },
];
exports.templateGenerate = [
    {
        type: 'text',
        name: 'name',
        message: 'Enter the name of the command',
    },
    {
        type: 'text',
        name: 'category',
        message: 'Enter the category of the command',
    },
];
exports.eventGenerate = [
    {
        type: 'autocompleteMultiselect',
        name: 'events',
        message: 'Which event(s) would you like to generate?',
        choices: [
            { title: 'READY', value: 'ready' },
            { title: 'CHANNEL_CREATE', value: 'channelCreate' },
            { title: 'CHANNEL_PINS_UPDATE', value: 'channelPinsUpdate' },
            { title: 'CHANNEL_UPDATE', value: 'channelUpdate' },
            { title: 'CLIENT_USER_GUILD_SETTINGS_UPDATE', value: 'clientUserGuildSettingsUpdate' },
            { title: 'CLIENT_USER_SETTINGS_UPDATE', value: 'clientUserGuildSettingsUpdate' },
            { title: 'DEBUG', value: 'debug' },
            { title: 'DISCONNECT', value: 'disconnect' },
            { title: 'EMOJI_CREATE', value: 'emojiCreate' },
            { title: 'EMOJI_DELETE', value: 'emojiDelete' },
            { title: 'EMOJI_UPDATE', value: 'emojiUpdate' },
            { title: 'ERROR', value: 'error' },
            { title: 'GUILD_BAN_ADD', value: 'guildBanAdd' },
            { title: 'GUILD_BAN_REMOVE', value: 'guildBanRemove' },
            { title: 'GUILD_CREATE', value: 'guildCreate' },
            { title: 'GUILD_DELETE', value: 'guildDelete' },
            { title: 'GUILD_INTEGRATIONS_UPDATE', value: 'guildIntegrationsUpdate' },
            { title: 'GUILD_MEMBER_ADD', value: 'guildMemberAdd' },
            { title: 'GUILD_MEMBER_AVAILABLE', value: 'guildMemberAvailable' },
            { title: 'GUILD_MEMBER_REMOVE', value: 'guildMemberRemove' },
            { title: 'GUILD_MEMBERS_CHUNK', value: 'guildMembersChunk' },
            { title: 'GUILD_MEMBERS_SPEAKING', value: 'guildMembersSpeaking' },
            { title: 'GUILD_MEMBER_UPDATE', value: 'guildMemberUpdate' },
            { title: 'GUILD_UNAVAILABLE', value: 'guildUnavailable' },
            { title: 'GUILD_UPDATE', value: 'guildUpdate' },
            { title: 'MESSAGE', value: 'message' },
            { title: 'MESSAGE_DELETE', value: 'messageDelete' },
            { title: 'MESSAGE_DELETE_BULK', value: 'messageDeleteBulk' },
            { title: 'MESSAGE_REACTION_ADD', value: 'messageReactionAdd' },
            { title: 'MESSAGE_REACTION_REMOVE', value: 'messageReactionRemove' },
            { title: 'MESSAGE_REACTION_REMOVE_ALL', value: 'messageReactionRemoveAll' },
            { title: 'MESSAGE_UPDATE', value: 'messageUpdate' },
            { title: 'PRESENCE_UPDATE', value: 'presenceUpdate' },
            { title: 'RATE_LIMIT', value: 'rateLimit' },
            { title: 'RECONNECTING', value: 'reconnecting' },
            { title: 'RESUME', value: 'resume' },
            { title: 'ROLE_CREATE', value: 'roleCreate' },
            { title: 'ROLE_DELETE', value: 'roleDelete' },
            { title: 'ROLE_UPDATE', value: 'roleUpdate' },
            { title: 'TYPING_START', value: 'typingStart' },
            { title: 'TYPING_STOP', value: 'typingStop' },
            { title: 'USER_NOTE_UPDATE', value: 'userNoteUpdate' },
            { title: 'USER_UPDATE', value: 'userUpdate' },
            { title: 'VOICE_STATE_UPDATE', value: 'voiceStateUpdate' },
            { title: 'WARN', value: 'warn' },
            { title: 'WEBHOOK_UPDATE', value: 'webhookUpdate' },
        ],
        hint: '- Space to select. Return to submit',
    },
];
