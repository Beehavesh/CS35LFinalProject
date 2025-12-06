const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given('I navigate to {string}', async function (path) {
  await this.page.goto(`https://cs35lfinalproject-1.onrender.com${path}`);
});

When('I fill {string} with {string}', async function (field, value) {
  await this.page.fill(`#${field}`, value);
});

When('I click {string}', async function (label) {
  await this.page.click(`button:has-text("${label}")`);
});

Then('I should be redirected to {string}', async function (path) {
  await expect(this.page).toHaveURL(`https://cs35lfinalproject-1.onrender.com${path}`);
});