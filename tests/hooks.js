import { Before, After } from "@cucumber/cucumber";
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000);
Before(async function () {
  if (!this.page) {
    await this.init();
  }
});

After(async function () {
  await this.cleanup();
});