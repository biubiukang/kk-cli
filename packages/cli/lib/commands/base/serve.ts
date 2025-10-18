import { spawn } from 'child_process';
import type { Command } from 'commander';

import { hasPnpm } from '../../utils/env';
export const serve = (program: Command) => {
    const command = program.createCommand('serve')
        .description('serve')
        .action(() => {
            const ishasPnpm = hasPnpm();
            const cmd = ishasPnpm ? 'pnpm' : 'npm';
            const params = ishasPnpm ? ['dev'] : ['run', 'dev'];
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