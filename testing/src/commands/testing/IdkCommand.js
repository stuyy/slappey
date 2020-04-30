const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class IdkCommand extends BaseCommand {
  constructor() {
    super('idk', 'testing', []);
  }

  run(client, message, args) {
    message.channel.send('idk command works');
  }
}
