Monorepo（单一代码仓库）是一种将多个相关项目或模块集中存储在同一版本控制仓库中的代码管理模式
其核心原理是通过统一的基础设施和工具链，实现跨项目的高效协作与资源共享
主包 
    turbo：  主要功能是在主包中可以 构建子包
    husky： 自动化git提交提供钩子，做提交的校验


子包lib
    "tsup": "8.4.0" 用来打包
    "commander": "13.1.0" 终端中命令
    "picocolors": "1.1.1", pc 配合consola 在控制台ui样式
    "consola": "3.4.2",  终端中打印类似console
    "prompts": "2.4.2",  做一些选择组件和样式插件 类似select 
    "ora": "8.2.0",  终端中loading样式组件
    "fs-extra": "11.3.1", 基于node:fs 做的fs处理组件
    "giget": "1.2.3"  用来远程下载模版的插件



