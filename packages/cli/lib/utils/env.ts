import { execSync } from 'child_process';
export function hasPnpm() {
    return !!getPnpmVersion();
}
export function getPnpmVersion() {
    let getPnpmVersion
    try {
        getPnpmVersion = execSync('pnpm -v',
            { stdio: ['pipe', 'pipe', 'ignore'] }
        ).toString().trim();
    } catch (error) {
        console.log('没有安装pnpm', error);
        getPnpmVersion = undefined
    }
    return getPnpmVersion;
}
