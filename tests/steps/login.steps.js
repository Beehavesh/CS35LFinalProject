const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given('I navigate to {string}', async function (path) {
  await this.page.goto(`http://localhost:5173${path}`);
});

When('I fill {string} with {string}', async function (field, value) {
  await this.page.fill(`#${field}`, value);
});

When('I click {string}', async function (label) {
  await this.page.click(`button:has-text("${label}")`);
});

Then('I should be redirected to {string}', async function (path) {
  await expect(this.page).toHaveURL(`http://localhost:5173${path}`);
});