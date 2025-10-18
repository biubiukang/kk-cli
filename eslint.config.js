import js from "@eslint/js"
import tseslint from "typescript-eslint"
import globals from "globals"
import importSort from "eslint-plugin-simple-import-sort"
import unicorn from "eslint-plugin-unicorn"
export default tseslint.config({
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{tsx,ts}"],
    ignores: ["*.js"],
    rules: {
        '@typescript-eslint/no-for-in-array': "off",
        "simple-import-sort/imports": [
            'error',
            {
                groups: [
                    ['^\\w'], // 表示 node 内置模块
                    ['^@\\w'],  // 表示以 @ 开头的路径
                    ['^@/'], // 表示以 @ 开头的自定义识别路径
                    ['^\\u0000'],
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
                ]
            }
        ],
        "simple-import-sort/exports": "error",
        "prefer-const": "off",  // 或设置为0\
    },
    //   语言特性
    languageOptions: {
        parser: tseslint.parser,
        globals: {
            ...globals.node,
        },
        parserOptions: {
            tsconfigRootDir: import.meta.dirname, // commonjs __dirname，esm import.meta.dirname
        },
    },
    plugins: {
        "simple-import-sort": importSort,
    },
});


