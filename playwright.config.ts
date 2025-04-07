import { defineConfig } from '@playwright/test';

/**
 * Read environment variables from a file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Configuration for Playwright tests.
 * See the official docs for more details: https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 5000,
  testDir: './tests',
  /* Run tests in parallel within files */
  fullyParallel: false,
  testMatch: 'test.list.ts',
  /* Ensure the build fails on CI if "test.only" is accidentally left in the code. */
  forbidOnly: !!process.env.CI,
  /* Retry tests only on CI */
  retries: process.env.CI ? 2 : 0,
  /* Avoid running tests in parallel on CI */
  workers: process.env.CI ? 1 : undefined,
  /* Choose the reporter for the test results. Reference: https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all projects below. Reference: https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* The base URL to be used in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4000',

    /* Enable trace collection when retrying a failed test. */
    trace: 'on-first-retry',
  },

  /* Start the local dev server before the tests are executed */
  webServer: {
    command: 'npm run testdb',
    url: 'http://localhost:4000/api',
    reuseExistingServer: false,
  },
});
