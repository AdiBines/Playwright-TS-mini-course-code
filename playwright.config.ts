import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
import 'dotenv/config'  //ייבוא חדיש יותר של סיפריות

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */

  /*fullyParallel: true, ריצה מקבלית נבטל */ 
  /* Fail the build on CI if you accidentally left test.only in the source code. ONLY-יכול להרוס את הריצה הכוללת.אז פקודה זו מבטלת עניין זה*/
  forbidOnly: !!process.env.CI,   /*מפיל את הריצה בענן במידה ויש טסט אונלי בקוד שלנו*/

  /* Retry on CI only ירוץ פעמיים בענן.שזה לוקאלית פעם אחת ואם נכשל נכשל.בענן ינסה פעמיים למקרה שהראשון יכשל והשני לא*/
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. להגדיר מספר דפדפנים שייפתחו מקביל לואקלית אפשר כמה במקביל ואפשר לנצל משאבים*/
  workers: process.env.CI ? 1 : 2,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. הגדרות כלליות*/
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. אתר שהוא הבסיס לשאר הבדיקות,ואז עליו להוסיף סיומות.זה שימושי לבדוק דפים כתובות נכונות וכו*/
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // מידע שנאסף ונוכל לדעת מה קרה עם הטסט לעומק במקרה של כישלון
    trace: 'on-first-retry',

    //נוסיף-
    screenshot:'on',
    video: 'on-first-retry',
    headless: process.env.CI ? true : false
  },

  /* Configure projects for major browsers */
  projects: [
    {
      //נשתמש בכרום את השאר ניתן לדרוס
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
    //בדיקות קומפוננט של ריאקט.ניתן להרים את הסרבס המקומי של ריאקט למען הבדיקות
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
