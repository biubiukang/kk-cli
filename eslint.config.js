import js from "@eslint/js"
import tseslint from "typescript-eslint"
import globals from "globals"
import importSort from "eslint-plugin-simple-import-sort"
export default tseslint.config({
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.ts"],
    ignores: ["*.js"],
    rules: {
        "simple-import-sort/imports":
            ["error", {
                groups: [
                    ['^\\w'],
                    ['^@\lw'],
                    ['^@/'],
                    ['^\\u0000'],
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    ['^\\./(?=.*/)(?!/?$)', ' ^\\.(?!/?$)']
                ]
            }],

        "simple-import-sort/exports": "error",
    },
    languageOptions: {
        parser: tseslint.parser,
        globals: {
            ...globals.node
        },
        parserOptions: {
            tsconfigRootDir: import.meta.dirname
        },
    },
    plugins: {
        "simple-import-sort": importSort,
    },

})

