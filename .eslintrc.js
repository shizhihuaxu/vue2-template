module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        quotes: ['warn', 'single'],
        semi: ['warn', 'never'],
        indent: ['warn', 4, {
            'SwitchCase': 1 // switch case 添加一个单位缩进
        }],
        'comma-dangle': ['warn', 'always-multiline'], // 对象、数组等最后一个元素使用尾逗号
        'prefer-template': 'error', // 优先使用字符串模板
        'space-before-blocks': ['warn', 'always'],
        'camelcase': 'off', // 允许小写+下划线
        'no-eval': 'error', // 不使用 eval
        'no-var': 'error', // 不使用 var
        'no-extra-boolean-cast': 'off', // 禁止不必要的布尔类型转换
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-case-declarations': 'off', // 允许在 case 中定义变量
        'no-unused-expressions': 'off', // 允许使用逻辑短路的三元运算符
        // vue 单引号
        'vue/html-quotes': ['error', 'single', {
            'avoidEscape': true
        }],
        // 插值 双花括号和内容之间需要有空格
        'vue/mustache-interpolation-spacing': 'error',
        // 空格不允许有多个
        'vue/no-multi-spaces': 'error',
        // 标签包裹的内容独占一行
        'vue/multiline-html-element-content-newline': 'error',
        // view-design input 标签等
        'vue/no-parsing-error': [
            'error',
            {
                'x-invalid-end-tag': false
            }
        ],
        // 多属性的闭合标签单独一行
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'never', // 单行属性不换行
            'multiline': 'always'
        }],
        // 属性换行配置 每个属性一行
        'vue/max-attributes-per-line': ['error', {
            'singleline': 1,
            'multiline': {
                'max': 1,
                'allowFirstLine': false // 第一个属性也要换行
            }
        }],
        // 缩进配置
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': false,
            'ignores': []
        }],
    },
    overrides: [{
        files: [
            '**/__tests__/*.{j,t}s?(x)',
            '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
            jest: true
        }
    }]
}
