import chalk    from 'chalk';
import config   from 'config';
import winston  from 'winston';

winston.level = config.get('log.level');

function now() {
    return new Date().toLocaleString();
}

function print(level, style, message, ...args) {
    winston.log(level, chalk.underline.black(`${now()}:`), style(message), ...args);
}

export function info(message, ...args) {
    print('info', chalk.blue, message, ...args);
}

export function success(message, ...args) {
    print('info', chalk.green.bold, message, ...args);
}

export function debug(message, ...args) {
    print('debug', chalk.cyan.bold, message, ...args);
}

export function warn(message, ...args) {
    print('warn', chalk.yellow, message, ...args);
}

export function error(message, ...args) {
    print('error', chalk.red.bold, message, ...args);
}