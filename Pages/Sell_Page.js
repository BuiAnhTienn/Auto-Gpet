const { By } = require("selenium-webdriver");
const BasePage = require("../until/helper");

class SellPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.classInvoice = By.className('sc-hjriPb cxRxMl')
  }
}

module.exports = SellPage;
