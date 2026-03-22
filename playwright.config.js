// @ts-check
// Config mise a jour — fix/config-cleanup
const { defineConfig, devices } = require('@playwright/test');
const { ENV } = require('./helpers/env.helper');

module.exports = defineConfig({

  // Dossier contenant tous les tests
  testDir: './tests',

  // Scripts de setup et teardown globaux
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),

  // Timeout global par test
  timeout: ENV.TIMEOUT,

  // Timeout pour chaque assertion
  expect: { timeout: 5000 },

  // Rapport HTML généré après chaque exécution
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Retry selon l'environnement
  retries: ENV.RETRIES,

  // 2 workers en CI, auto en local
  workers: process.env.CI ? 2 : undefined,

  // Config partagée par tous les tests
  use: {
    // URL de base
    baseURL: ENV.BASE_URL,

    // Screenshot uniquement en cas d'échec
    screenshot: 'only-on-failure',

    // Trace uniquement en cas d'échec
    trace: 'retain-on-failure',

    // Animations réduites
    reducedMotion: 'reduce',

    // Headless selon environnement
    headless: ENV.HEADLESS,
  },

  // Navigateurs testés
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
  ],

  // Démarre automatiquement le serveur local avant les tests
  webServer: {
    command: 'npx serve ./app --listen 3000',
    url: ENV.BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
});