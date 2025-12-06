import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the homepage', async function () {
  await this.page.goto('http://localhost:5173', {
    waitUntil: 'networkidle'});
});

When('I log in successfully', async function () {
  await this.page.fill('#email', "test@example.com");
  await this.page.fill('#password', "password123");
  await this.page.click('#login-button');
});

When('I navigate to the {string} section', async function (sectionName) {
  const page = this.page;

  if (sectionName === "Playlists") {
    await page.getByTestId("playlist-icon").click();
  } else {
    throw new Error(`Unknown navigation section: ${sectionName}`);
  }
  await page.waitForLoadState("networkidle");
});

When('I open the playlist form', async function () {
  await this.page.click('#open-playlist-form');
});

When('I enter a playlist title {string}', async function (title) {
  await this.page.locator('input[type="text"]').nth(0).fill(title);
});

When('I add songs to the playlist', async function () {
  await this.page.getByTestId("addSongButton").click();
  await this.page.locator('input[type="text"]').nth(1).fill("Song 1");
  await this.page.locator('input[type="text"]').nth(2).fill("Artist 1");
});

When('I submit the playlist', async function () {
  await this.page.getByTestId("modal-submit-button").click();
});

Then('I should see my playlist appear in the playlist list', async function () {
  const playlist = await this.page.waitForSelector('.playlist-item');
  expect(playlist).toBeTruthy();
});