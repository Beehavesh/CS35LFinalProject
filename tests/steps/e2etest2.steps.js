import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

/*Given('I am on the homepage', async function () {
  await this.page.goto('http://localhost:5173', {
    waitUntil: 'networkidle'});
});

When('I log in successfully', async function () {
  await this.page.fill('#email', "test@example.com");
  await this.page.fill('#password', "password123");
  await this.page.click('#login-button');
});*/

When('I navigate to the {string} page', async function (sectionName) {
  const page = this.page;

  if (sectionName === "Jobposts") {
    await page.getByTestId("jobpost-icon").click();
  } else {
    throw new Error(`Unknown navigation section: ${sectionName}`);
  }
  await page.waitForLoadState("networkidle");
});

When('I open the new post modal', async function () {
  await this.page.click('#open-post-modal');
});

When('I type {string} into the post field', async function (title) {
  await this.page.locator('input[type="text"]').nth(0).fill(title);
});

When('I submit the post', async function () {
  await this.page.getByTestId("modal-submit-button").click();
});

Then('I should see the post in the feed', async function () {
  const playlist = await this.page.waitForSelector('.user-post-item');
  expect(playlist).toBeTruthy();
});