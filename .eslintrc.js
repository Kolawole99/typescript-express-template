const rules = {
    env: {
        commonjs: true,
        es6: true,
        es2021: true,
        node: true,
        mocha: true,
        mongo: true,
    },
    extends: ['eslint:recommended', 'prettier', 'airbnb', 'plugin:security/recommended'],
    plugins: ['prettier', 'security'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        SampleController: 'readonly',
        CustomValidationError: 'readonly',
        CustomControllerError: 'readonly',
        verifyDevelopmentEnvironment: 'readonly',
    },
    parserOptions: { ecmaVersion: 2018 },
    rules: {
        'prettier/prettier': 'error',
        indent: [2, 4],
        'no-console': 'off',
        'no-unneeded-ternary': ['error', { defaultAssignment: true }],
        'no-else-return': ['error', { allowElseIf: true }],
        'class-methods-use-this': [
            'error',
            {
                exceptMethods: [
                    'processFailedResponse',
                    'processSuccessfulResponse',
                    'handleDatabaseRead',
                    'processSingleRead',
                    'processMultipleReadResults',
                    'processUpdateResult',
                    'processDeleteResult',
                    'validateEmail',
                    'filterJOIValidation',
                ],
            },
        ],
        'newline-per-chained-call': 'off',
        'object-curly-newline': [
            'error',
            {
                ObjectExpression: { multiline: true },
                ObjectPattern: { multiline: true },
                ImportDeclaration: { multiline: true },
                ExportDeclaration: { multiline: true, minProperties: 3 },
            },
        ],
        'comma-dangle': [
            'error',
            {
                arrays: 'only-multiline',
                objects: 'only-multiline',
                imports: 'never',
                exports: 'never',
                functions: 'never',
            },
        ],
        'new-cap': [
            'error',
            {
                newIsCapExceptions: ['this.model'],
                properties: false,
            },
        ],
        'no-underscore-dangle': ['error', { allow: ['_id', '_v'] }],
        'operator-linebreak': ['error', 'before'],
        'no-param-reassign': ['error', { props: false }],
    },
};

module.exports = rules;
