"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventTemplates = {
    ready: `const BaseEvent = require('../../utils/structures/BaseEvent');
  module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
      super('ready');
    }
    
    async run(client, message) {
      console.log(client.usert.tag + ' has logged in.');
    }
  }`,
    message: `const BaseEvent = require('../../utils/structures/BaseEvent');
  module.exports = class MessageEvent extends BaseEvent {
    constructor() {
      super('message');
    }
    
    async run(client, message) {
      console.log(client.usert.tag + ' has logged in.');
    }
  }`,
};
