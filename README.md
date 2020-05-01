# Slappey

Slap together a Discord Bot project in seconds!

![slappey-logo](https://i.imgur.com/q4ofLAo.png)


## What is Slappey?

Slappey is a cli tool that lets you generate a Discord.JS project (version 12 or version 11), in a matter of seconds.

Currently supports only JavaScript, but will support TypeScript soon.

# Instructions

Install slappey by running `npm install -g slappey` on your terminal or Windows CMD. This will install slappey globally.

- To create a project, type `slappey`, or simply type `slappey new <name of project>`

- Follow the steps and enter your Bot Token and Prefix.

- Once done, `cd` into your project by typing `cd <name of project>`

- To run the bot, type `npm run dev`. This will run the bot using `nodemon`, you MUST have `nodemon` installed, otherwise, use `npm run start`

# Generating Commands

- Slappey allows you to generate commands into categories. You can type `slappey` and select **Generate** to generate a command, or `slappey new command`.

- It will ask you for a name, and then a category. This will generate all commands in the `src/commands` folder, in the correct category.

# Generating Events

- You can generate events by running `slappey new event`, this will prompt you to select which events you would like to generate.

- To select event(s), press space bar and use the up and down arrow keys to navigate. Hit enter when you're done and your event files will be generated in the `src/events` folder.


## Will Slappey support TypeScript?

- Soon

## Will Slappey support Python?

- Soon

