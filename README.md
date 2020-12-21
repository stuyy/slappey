# Slappey

Slap together a Discord Bot project in seconds!

![slappey-logo](https://i.imgur.com/q4ofLAo.png)

## What is Slappey?

Slappey is a CLI (Command Line Interface) tool that lets you generate a Discord.JS project in a matter of seconds.

## Why Slappey?

Do you use a Command/Event Handler? Are you tired of having to copy & paste the same files over and over again, or cloning a repository? Slappey serves as a purpose to eliminate the annoyance of doing that. Instead, with a simple command, Slappey will generate a base structure for your next Discord Bot Project.

It does so by using the most basic command & event handler. Simplicity is key. And since it works well, why change it? Regardless, if you need to try some things out without needing to re-write the same functions all the time, Slappey is great for that.

It also eliminates the abstraction away from users so they need not worry about how commands and events are registered. It will just work out of the box.

## What Slappey is NOT

- A Framework
- A Library
- A Discord Bot (It is a Discord Bot Project **generator**)
- A replacement for coding

Currently supports only JavaScript, but will support TypeScript soon.

# Instructions

Install slappey by running `npm install -g slappey` or `yarn global add slappey` on your terminal or Windows CMD. This will install Slappey globally.

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

- ~~Soon~~

Slappey now supports TypeScript as of 6/1/2020!

You must have TypeScript installed. However, if you don't, during the installation process, if you selected TypeScript, Slappey will ask you if you would like to install TypeScript, ts-node, and setup a basic tsconfig.json file. If you enter n (no), you will have to install these manually.

ts-node is a TypeScript interpreter for Node.JS, the dev script uses it along with nodemon, so be sure you have nodemon installed.

Otherwise, if you have TypeScript installed, you can skip this part and just run `npm run build` and then `npm run start`

## Will Slappey support Python?

- Soon
