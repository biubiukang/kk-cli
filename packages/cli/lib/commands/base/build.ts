import { spawn } from 'child_process';
import type { Command } from 'commander';

import { hasPnpm } from '../../utils/env';
export const build = (program: Command) => {
    const command = program.createCommand('build')
        .description('build')
        .action(() => {
            const ishasPnpm = hasPnpm();
            const cmd = ishasPnpm ? 'pnpm' : 'npm';
            const params = ishasPnpm ? ['build'] : ['run', 'build'];
            const child = spawn(cmd,
                params,
                {
                    cwd: process.cwd(),
                    stdio: 'inherit'
                });
            child.on('close', (code) => {
                process.exit(code ?? 0);
            });
        })
    return command;
}