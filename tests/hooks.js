const { Before, After } = require("@cucumber/cucumber");

Before(async function () {
  if (!this.page) {
    await this.init();
  }
});

After(async function () {
  await this.cleanup();
});