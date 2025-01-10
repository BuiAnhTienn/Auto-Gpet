const { until } = require("selenium-webdriver");
const { LOGIN_URL } = require("./config");

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigatePage() {
    return await this.driver.get(LOGIN_URL);
  }
  async getUrl() {
   return await this.driver.getCurrentUrl(); // có kết quả thì phải return về để hàm làm việc , kh thì nó kh viết lấy cái gì để làm
  }
  async findElement(locator) {
    return await this.driver.findElement(locator);
  }
  async findElements(locator) {
    return await this.driver.findElements(locator);
  }
  async findElementLinkText(linktext) {
    return await this.driver.findElement(linktext);
  }
  async hoverSubmenu(locator) {
    let hover = await this.driver.findElement(locator);
    this.driver.actions().move({ origin: hover }).perform();
    this.driver.actions().scroll(0, 0, 0, 300, hover);
  }
  async waitElement(locator) {
    return await this.driver.wait(until.elementLocated(locator), 5000);
  }
}

module.exports = BasePage;
