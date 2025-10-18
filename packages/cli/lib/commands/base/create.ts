import type { Command } from 'commander';
import prompts from 'prompts';

import { loadTemplate } from '../../utils/loadTemplate';
type createCommandOptions = {
    framework?: string;
    template?: string;
    remote?: string;
}
export const create = (program: Command) => {
    const command = program.createCommand('create')
        .description('create').arguments('<project-name>')
        .option('-f, --framework <framework>', '选择项目类型')
        .option('-t, --template <template>', '选择项目模版')
        .option('-r, --remote <remote>', '远程模版')
        .action(async (projectName: string, options: createCommandOptions) => {
            let { framework = "", template = "", remote = false } = options;
            if (remote) {
                // 远程模板
                loadTemplate({
                    projectName,
                    template,
                    remote: true
                })
                return
            }
            if (!framework) {
                const response = await prompts({
                    type: 'select',
                    name: 'framework',
                    message: '请选择项目类型',
                    choices: [
                        { title: 'react', value: 'react' },
                        { title: 'vue', value: 'vue' },
                        { title: 'node', value: 'node' },
                    ],
                    initial: 0,
                })
                framework = response.framework;
            }
            if (!template) {
                const response = await prompts({
                    type: 'select',
                    name: 'template',
                    message: '请选择项目模版',
                    choices: [
                        { title: "React", value: "react" },
                        { title: "Vue3", value: "vue3" },
                        { title: "Vue2", value: "vue2" },
                        { title: "Nest", value: "nest" },
                        { title: "Express", value: "express" },
                    ],
                    initial: 0,
                })
                template = response.template;
            }
            loadTemplate({ projectName, template })
        })
    return command;
}