export function getMainFileAkairo(id: string) {
  return `
        require('dotenv').config();
        import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
        
        class SlappeyClient extends AkairoClient {
            constructor(){
                super({
                    ownerID: ${id}
                }, {
                    disableMentions: 'everyone'
                })

                this.commandHandler = new CommandHandler(this, {
                    directory: './commands/',
                    prefix: process.env.DISCORD_BOT_PREFIX,
                })

                this.listenerHandler = news ListenerHandler(this, {
                    directory: './event
                })
                this.commandHandler.useListenerHandler(this.listenerHandler);
                this.commandHandler.loadAll();
                this.listenerHandler.loadAll();
            }
        }

        const client = new SlappeyClient();
        client.login(process.env.DISCORD_BOT_TOKEN)
    `;
}

export function getMainFileAkairoTS(id: string) {
  return `
          require('dotenv').config();
          import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
          

          declare module "discord-akairo" {
            interface AkairoClient {
              commandHandler: CommandHandler;
              listenerHander: ListenerHandler;
            }
          }

          class SlappeyClient extends AkairoClient {
              public constructor(config: BotOptions){
                  super({
                      ownerID: ${id}
                  }, {
                      disableMentions: 'everyone'
                  })
  
                  public this.commandHandler: CommandHandler = new CommandHandler(this, {
                      directory: './commands/',
                      prefix: process.env.DISCORD_BOT_PREFIX,
                  })
  
                  public this.listenerHandler: ListenerHandler = new ListenerHandler(this, {
                      directory: './event
                  })
                  this.commandHandler.useListenerHandler(this.listenerHandler);
                  this.commandHandler.loadAll();
                  this.listenerHandler.loadAll();
              }
          }
  
          const client: SlappeyClient = new SlappeyClient();
          client.login(process.env.DISCORD_BOT_TOKEN);
      `;
}

export function getTestCommandAkairo() {
  return `
    import {Command} from "discord-akairo";

    class TestCommand extends Command {
        constructor(){
            super('test', {
                aliases: ['test'],
                category: 'Test',
                info: {
                    description: "A command to test everything works",
                    examples: ['test'],
                    usage: 'test'
                }
            })
        }

        exec(message){
            message.util.send("Test command works!");
        }
    };

    module.exports = TestCommand;
    `;
}

export function getTestCommandAkairoTS() {
  return `
      import {Command} from "discord-akairo";
  
      export default class TestCommand extends Command {
          public constructor(){
              super('test', {
                  aliases: ['test'],
                  category: 'Test',
                  info: {
                      description: "A command to test everything works",
                      examples: ['test'],
                      usage: 'test'
                  }
              })
          }
  
          public exec(message){
              message.util.send("Test command works!");
          }
      };
  
      `;
}

export function getReadyEventAkairo() {
  return `
    import {Listener} from "discord-akairo";

    class ReadyEvent extends Listener {
        constructor(){
            super('ready', {
                emitter: 'client',
                event: 'ready',
            })
        }

        exec(){
            console.log('Logged in and ready!');
        }
    };

    module.exports = ReadyEvent
    `;
}

export function getReadyEventAkairoTS() {
  return `
    import {Listener} from "discord-akairo";

    export default class ReadyEvent extends Listener {
        public constructor(){
            super('ready', {
                emitter: 'client',
                event: 'ready',
            })
        }

        public exec(){
            console.log('Logged in and ready!');
        }
    };
    `;
}

export async function getCommandTemplateAkairo(name: string, category: string) {
  return `
        import {Command} from "discord-akairo";

        class ${name}Command extends Command {
            constructor(){
                super('${name}', {
                    aliases: ['${name}'],
                    category: '${category}',
                    info: {
                        description: /*Put description here*/,
                        usage: /*Put usage here*/,
                        examples: [/*Put command examples here*/]
                    },
                    cooldown: /*in milliseconds*/,
                    ratelimit: /*Put ratelimit here*/,
                })
            }

            exec(message){
                /*Put command code here*/
            }
        }

        module.exports = ${name}Command

    `;
}

export async function getCommandTemplateAkairoTS(
  name: string,
  category: string
) {
  return `
          import {Command} from "discord-akairo";
          import {Message} from "discord.js";
  
          export default class ${name}Command extends Command {
              public constructor(){
                  super('${name}', {
                      aliases: ['${name}'],
                      category: '${category}',
                      info: {
                          description: /*Put description here*/,
                          usage: /*Put usage here*/,
                          examples: [/*Put command examples here*/]
                      },
                      cooldown: /*in milliseconds*/,
                      ratelimit: /*Put ratelimit here*/,
                  })
              }
  
              public exec(message: Message){
                  /*Put command code here*/
              }
          }
      `;
}

