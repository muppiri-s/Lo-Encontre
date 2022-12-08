const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://3.21.166.219:8000/home',
		specPattern: 'cypress/integration/**/*.spec.ts',
	},
});
