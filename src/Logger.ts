import chalk from "chalk";
import symbols from "log-symbols";
import { Logger } from "./utils/index";

export class SimpleLogger implements Logger {
  private static instance: SimpleLogger;

  success(message: string): void {
    console.log(`${symbols.success} ${chalk.greenBright.bold(message)}`);
  }

  error(message: string): void {
    console.log(`${symbols.error} ${chalk.redBright.bold(message)}`);
  }

  warning(message: string): void {
    console.log(`${symbols.warning} ${chalk.gray.bold(message)}`);
  }

  info(message: string): void {
    console.log(chalk.redBright.bold(`${symbols.info} ${message}`));
  }

  static getSimpleLogger(): SimpleLogger {
    if (!SimpleLogger.instance) {
      SimpleLogger.instance = new SimpleLogger();
    }
    return SimpleLogger.instance;
  }
}
