import { program } from 'commander';
import { deploy } from './commands/deploy.ts';
import { commandPluginInit } from './commands/init.ts';
// const commands = new Map<string, Function>();
// function registerCommand(command: string, action: Function) {
//     commands.set(command, action);
// }
// // 注册命令
// registerCommand('init', init);
// registerCommand('deploy', deploy);

// // 运行命令
export function runCli() {
    // program.option("--first").option('')

    program.command('deploy').description('Deploy something').action(() => {
        deploy();
    });
    //
    program.addCommand(commandPluginInit)
    program.parse(process.argv)
}