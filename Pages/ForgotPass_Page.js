const { By, error } = require("selenium-webdriver");
const BasePage = require("../until/helper");
const { FORGOT_PASSWORD_EMAIL, TEXT_NOTI_ERROR } = require("../until/config");

class ForgotPassWord extends BasePage {
  constructor(driver) {
    super(driver);
    this.emailField = By.id("email");
    this.continueButton = By.xpath(
      '//*[@id="root"]/div/div/div/div/div/div/div/div/form/div[2]/button'
    );
    this.popupVerify = By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/div");
    this.alertErrorInvalid = By.className("ant-message-notice-content");
  }

  async enterEmailField(email) {
    let enterEmail = await this.findElement(this.emailField);
    await enterEmail.sendKeys(email);
  }

  async showVerifySentPass() {
    await this.waitElement(this.popupVerify);
    let popupSentPass = await this.findElement(this.popupVerify);

    console.log(
      (await popupSentPass.isDisplayed()) == true
        ? "Đã gửi Email để lấy lại mật khẩu !"
        : "Chưa gửi Pass về Email !"
    );
  }
  async clickButtonContinue() {
    let button = await this.findElement(this.continueButton);
    if ((await button.isEnabled()) == true) {
      await button.click();
      console.log("Đã Hiện Form Xác Nhận Lấy Được Mật Khẩu !");
    } else {
      console.log("Nút chưa được Nhấn !");
    }
  }

  async findAlertError() {
    let alertErrorEmail = await this.findElement(this.alertErrorInvalid);
    if ((await alertErrorEmail.isDisplayed()) == true) {
      let getTextErrorEmail = await alertErrorEmail.getText();
      console.log(
        (await getTextErrorEmail) === TEXT_NOTI_ERROR
          ? `Noti là: ${getTextErrorEmail}`
          : "Sai thông báo khi nhập email không tồn tại hoặc hợp lệ"
      );
    } else
      console.log(
        "Không hiển thị thông báo nào khi nhập email không tồn tại hoặc chính xác để lấy Email!"
      );
  }
  async getForgotPass(email) {
    await this.enterEmailField(email);
    await this.clickButtonContinue();
  }
}

module.exports = ForgotPassWord;
