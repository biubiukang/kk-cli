import { copy, exists, readJson, writeJson } from 'fs-extra';
import { downloadTemplate } from 'giget';
import ora from 'ora';
import path from 'path';
import prompts from 'prompts';
export type loadLocalTemplateOptions = {
    projectName: string;
    template: string;
}
export type loadRemoteTemplateOptions = {
    projectName: string;
    remote?: boolean;
}
export type loadTemplateOptions = loadLocalTemplateOptions & loadRemoteTemplateOptions;

export const generatePackageJson = async (projectName: string) => {
    const targetPath = path.resolve(process.cwd(), projectName);
    const pkgPath = path.resolve(targetPath, 'package.json')
    const originPackageJson = await readJson(pkgPath)
    await writeJson(pkgPath, {
        ...originPackageJson,
        name: projectName,
        version: '1.0.0',
        private: true,
    }, { spaces: 4 })
    // return writeJson;
}

// 远程方式
export const loadRemoteTemplate = async (options: loadRemoteTemplateOptions) => {
    console.log('远程', options);
    // 预设远程模版
    const { dir } = await downloadTemplate('https://codeload.github.com/design-sparx/antd-multipurpose-dashboard/tar.gz/refs/heads/main', {
        dir: `${process.cwd()}/remote-templates`,
    })
    console.log('dir', dir);
}
// 本地方式
export const loadLocalTemplate = async (options: loadLocalTemplateOptions) => {
    console.log('options', options);

    const templatePath = path.resolve(__dirname, `../templates/template-${options.template}`);
    const targetPath = path.resolve(process.cwd(), options.projectName);
    const spinner = ora()
    if (await exists(targetPath)) {
        // spinner.text = '模版已存在';
        // spinner.color = 'yellow';
        const isOverride = await prompts({
            type: 'toggle',
            name: 'value',
            message: `当前目录已存在${options.projectName}，是否覆盖？`,
            initial: false,
            active: '是',
            inactive: '否'
        })
        if (!isOverride.value) {
            // spinner.fail('模版复制失败');
            return;
        } else {
            spinner.start();
            spinner.text = '正在覆盖模版...';
            spinner.color = 'cyan';
            await copy(templatePath, targetPath);
            generatePackageJson(options.projectName);
            spinner.succeed('模版覆盖完成');
        }
    } else {
        spinner.start();
        spinner.text = '模版复制中...';
        spinner.color = 'cyan';
        await copy(templatePath, targetPath);
        generatePackageJson(options.projectName);
        spinner.succeed('模版下载完成');
    }
}
export const loadTemplate = async (options: loadTemplateOptions) => {
    const { projectName, template, remote } = options;
    if (remote) {
        // 远程方式
        await loadRemoteTemplate({ projectName })
    } else {
        // 本地方式
        await loadLocalTemplate({ projectName, template })
    }
}