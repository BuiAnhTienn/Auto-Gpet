const { By } = require("selenium-webdriver");
const BasePage = require("../until/helper");

class ClinicList extends BasePage {
  constructor(driver) {
    super(driver);
    this.numberClinicsText = By.xpath(
      '//*[@id="root"]/div/div/div/div/div/div/div/div/div/div[1]/div[1]/p'
    );
    this.rooms = By.className("ant-row sc-iinbLa gqBYQt");
  }
  async totalNumberClinics() {
    let numberClinics = await this.findElement(this.numberClinicsText)
    let getTextnumberClinics = await numberClinics.getText()
    console.log(getTextnumberClinics)

  }
}

module.exports = ClinicList;
