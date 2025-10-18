import type { Command } from 'commander';
import pc from 'picocolors';

import pkg from '../../../package.json';
import { logger } from '../../utils/logger.js';
export const info = (program: Command) => {
    return program.createCommand('info')
        .description('info')
        .action(() => {
            logger.log(pc.bgGreen(`${pkg.version}`))
            logger.log(pc.green('kk'))
        })
}