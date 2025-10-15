import { program } from 'commander';
export const commandPluginInit = program.createCommand('init')
    .description('init')
    .action(() => {
        console.log('init!');
    })