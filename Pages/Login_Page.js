const { By, until } = require("selenium-webdriver");
const BasePage = require("../until/helper");
const config = require("../until/config");

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.usernameField = By.id("normal_login_email");
    this.userpassField = By.xpath('//*[@id="normal_login_password"]/input');
    this.loginButton = By.xpath(
      '//*[@id="normal_login"]/div[5]/div/div/div/div/button'
    );
    this.checkboxSavePass = By.xpath(
      '//*[@id="normal_login"]/div[4]/div/div/div/div/label/span[1]/input'
    );
    this.forgotPass = By.xpath(
      '//*[@id="normal_login"]/div[4]/div/div/div/div/button'
    ); // chú ý cái type của element ở đây nó type button nên kh dùng link texk
    this.alertPass = By.xpath('//*[@id="normal_login_password_help"]/div');
    this.notiAlertNotFound = By.className("ant-message");
    this.notiAlertBlock = By.className("ant-message-notice");
  }

  async enterUserName(name) {
    let userName = await this.findElement(this.usernameField);
    await userName.sendKeys(name);
    // await this.driver.findElement(this.usernameField).sendKeys(name);
  }
  async enterPass(pass) {
    let passWord = await this.findElement(this.userpassField);
    await passWord.sendKeys(pass);
    // await this.driver.findElement(this.userpassField).sendKeys(pass);
  }
  async clickButtonLogin() {
    let buttonLogin = await this.findElement(this.loginButton);
    if ((await buttonLogin.isEnabled()) == true) {
      await buttonLogin.click();
      console.log("Đã click Đăng Nhập");
    } else {
      console.log("Chưa click được nút Đăng Nhập !");
    }
    return buttonLogin;
  }
  async loginPage(name, pass) {
    // const INPUT_NAME = "keocontau4@gmail.com";
    // const INPUT_PASS = "anhtien";
    await this.enterUserName(name);
    await this.enterPass(pass);
    await this.clickButtonLogin();
  }

  async checkLinkForgotPassword() {
    let linkTextForgotPass = await this.findElement(this.forgotPass);
    await linkTextForgotPass.click();
    // const URL_FORGOTPASS = "https://dev.gpet.vn/forgot-password";
    let urlForgotPassWord = await this.getUrl();
    console.log("Link URL là :", urlForgotPassWord);

    console.log(
      urlForgotPassWord === config.FORGOT_PASSWORD_EMAIL
        ? "Đã vào trang Quên Mật Khẩu"
        : "Chưa vào được trang Quên Mật Khẩu"
    );
  }

  async getUrlLoginPage() {
    let urlSell = await this.getUrl();
    console.log("Link Hiện Tại Là:", urlSell);
    console.log(
      (await urlSell) === config.SELL_URL
        ? "Đã vào trang Bán Hàng!"
        : "Chưa vào trang bán hàng"
    );
  }

  async findArlertInputPass() {
    let alertFieldPass = await this.findElement(this.alertPass);

    if ((await alertFieldPass.isDisplayed()) == true) {
      console.log("FIELD PASS:", await alertFieldPass.getText());
    } else {
      console.log("Chưa hiển thị thông báo!");
    }
  }
  async findArlerNotFound() {
    let notificationNotfound = await this.findElement(this.notiAlertNotFound);

    if ((await notificationNotfound.isDisplayed()) == true) {
      let getTextNotiNotFound = await notificationNotfound.getText();
      console.log(
        (await getTextNotiNotFound) === config.TEXT_NOTI_ACCOUT_NOTFOUND
          ? `Noti là: ${getTextNotiNotFound}`
          : "SAI NOTIFICATION CHO TÀI KHOẢN KHÔNG TỒN TẠI!"
      );
    } else {
      console.log("Lỗi không hiển thị thông báo khi account không tồn tại !");
    }
  }
  async findArlerBlockUser() {
    let notificationBlockUser = await this.findElement(this.notiAlertBlock);
    if ((await notificationBlockUser.isDisplayed()) == true) {
      let getTextNotiBlockUser = await notificationBlockUser.getText();
      console.log(
        (await getTextNotiBlockUser) === config.TEXT_NOTI_BLOCK_USER
          ? `Noti là: ${getTextNotiBlockUser}`
          : "SAI NOTIFICATION CHO TÀI KHOẢN BỊ KHÓA!"
      );
    } else {
      console.log("Lỗi không hiển thị thông báo khi account bị khóa !");
    }
  }
}

module.exports = LoginPage;
