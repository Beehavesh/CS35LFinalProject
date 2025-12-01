const { setWorldConstructor, World } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.init();
  }

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
