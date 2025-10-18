import type { Command } from 'commander';
export const preview = (program: Command) => {
    const command = program.createCommand('preview')
        .description('preview')
        .action(() => {
            console.log('preview!dddd');
        })
    return command;
}