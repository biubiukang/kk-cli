import type { Command } from 'commander';
import { program } from 'commander';
type Fn = (p: Command) => Command;
// 插件注册
export const registerCommand = (fn: Fn) => {
    program.addCommand(fn(program));
}