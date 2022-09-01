module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},

	env: {
		browser: true,
		node: true,
		es6: true,
	},

	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				extensions: ['.ts', '.tsx'],
			},
		},
	},

	plugins: ['@typescript-eslint'],
	extends: [
		'next/core-web-vitals',
		'plugin:@typescript-eslint/recommended',
		'airbnb',
		'prettier',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
		'plugin:sonarjs/recommended',
		'plugin:security/recommended',
		'plugin:react-hooks/recommended',
	],

	rules: {
		'react/prop-types': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-explicit-any': 'warn',
		'react-hooks/exhaustive-deps': 'warn',
		'import/no-named-as-default': 'off',
		'import/no-cycle': 'warn',
		'sonarjs/cognitive-complexity': 'warn',
		'sonarjs/no-duplicate-string': 'warn',
		'sonarjs/no-identical-functions': 'warn',
		'@typescript-eslint/ban-types': 'warn',
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.ts', '.tsx', '.js', '.jsx'],
			},
		],
		'react/jsx-props-no-spreading': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: ['Link'],
				specialLink: ['hrefLeft', 'hrefRight'],
				aspects: ['invalidHref', 'preferButton'],
			},
		],
		'no-nested-ternary': 'off',
		'import/prefer-default-export': 'off',
	},
}
