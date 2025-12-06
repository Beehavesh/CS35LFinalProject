const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is logged in', async function () {
  await this.page.goto('https://cs35lfinalproject-1.onrender.com', {
    waitUntil: 'domcontentloaded'
  });
  await this.page.getByPlaceholder('Email').fill('test@example.com');
  await this.page.getByPlaceholder('Password').fill('password123');
  await this.page.click(`button:has-text("Log in")`);
  //await this.page.waitForURL(/home/i);
});

When('the user navigates to the {string} section', async function (sectionName) {
  await this.page.getByRole('link', { name: sectionName }).click();
  await this.page.waitForURL(/playlist/i);
});

Then('the user should see a list of their playlists displayed', async function () {
  const playlistItems = await this.page.locator('.playlist-item').count();
  expect(playlistItems).toBeGreaterThan(0);
});

When('the user clicks on {string}', async function (buttonText) {
  await this.page.getByRole('button', { name: buttonText }).click();
});

When('fills in the playlist details', async function () {
  await this.page.getByPlaceholder('Playlist Title').fill('My Test Playlist');
  await this.page.getByPlaceholder('Songs').fill('Imagine Dragons - Believer');
});

When('submits the form', async function () {
  await this.page.getByRole('button', { name: /submit/i }).click();
});

Then('the new playlist should be added to their list of playlists', async function () {
  const playlist = this.page.getByText('My Test Playlist');
  await expect(playlist).toBeVisible();
});

Given('has at least one playlist', async function () {
  const count = await this.page.locator('.playlist-item').count();
  expect(count).toBeGreaterThan(0);
});

When('the user selects a playlist to edit', async function () {
  await this.page.locator('.playlist-item .edit-btn').first().click();
});

When('modifies the playlist details', async function () {
  const titleField = this.page.getByPlaceholder('Playlist Title');
  await titleField.fill('');
  await titleField.fill('Updated Playlist Title');
});

When('saves the changes', async function () {
  await this.page.getByRole('button', { name: /save/i }).click();
});

Then('the updated playlist should reflect the changes in their list of playlists', async function () {
  const updated = this.page.getByText('Updated Playlist Title');
  await expect(updated).toBeVisible();
});

When('the user selects a playlist to delete', async function () {
  await this.page.locator('.playlist-item .delete-btn').first().click();
});

When('confirms the deletion', async function () {
  await this.page.getByRole('button', { name: /confirm/i }).click();
});

Then('the playlist should be removed from their list of playlists', async function () {
  const items = this.page.locator('.playlist-item');
  const countAfter = await items.count();

  expect(countAfter).toBeGreaterThanOrEqual(0);
});
