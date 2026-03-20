// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

  // Dossier contenant tous les tests
  testDir: './tests',

  // Timeout global par test
  timeout: 30000,

  // Timeout pour chaque assertion
  expect: { timeout: 5000 },

  // Rapport HTML généré après chaque exécution
  reporter: [['html', { open: 'never' }]],

  // Pas de retry en local, 1 en CI
  retries: process.env.CI ? 1 : 0,

  // 2 workers en CI, auto en local
  workers: process.env.CI ? 2 : undefined,

  // Config partagée par tous les tests
  use: {
    // URL de base — Playwright ouvrira toujours cette adresse
    baseURL: 'http://localhost:3000',

    // Screenshot uniquement en cas d'échec
    screenshot: 'only-on-failure',

    // Trace uniquement en cas d'échec (pour debug)
    trace: 'retain-on-failure',

    // Animations réduites — évite les timeouts sur transitions CSS
    reducedMotion: 'reduce',
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
    // Viewport mobile
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
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
});