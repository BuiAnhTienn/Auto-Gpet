const ForgotPassWord = require("../Pages/ForgotPass_Page");
const LoginPage = require("../Pages/Login_Page");
const getBrowser = require("../until/Setup_Browser");
const { BROWSER_CHROME, NOT_FOUND_USERNAME, FORGOT_PASSWORD_EMAIL } = require("../until/config");
const BasePage = require("../until/helper");

let driver;
let basepage;
let forgotpass;
let loginpage;
before(async () => {
  // const BROWSER = "chrome";
  driver = await getBrowser(BROWSER_CHROME);
  loginpage = new LoginPage(driver);
  basepage = new BasePage(driver);
  forgotpass = new ForgotPassWord(driver);
});
after(async() => {
    await driver.quit()
});
describe("Forgot PassWord", () => {
  it("Nhập Email không tồn tại", async () => {
    await basepage.navigatePage();
    await driver.sleep(3000);
    await loginpage.checkLinkForgotPassword(); // vào trang forgotpass
    await driver.sleep(3000);
    await forgotpass.getForgotPass(NOT_FOUND_USERNAME)
    await driver.sleep(3000);
    await forgotpass.findAlertError()
    await driver.sleep(3000)
    
  });
  it("Nhập Email hợp lệ", async () => {
    await basepage.navigatePage();
    await driver.sleep(3000);
    await loginpage.checkLinkForgotPassword(); // vào trang forgotpass
    await driver.sleep(3000);
    await forgotpass.getForgotPass(FORGOT_PASSWORD_EMAIL)
    await driver.sleep(3000);
    await forgotpass.showVerifySentPass()
    await driver.sleep(3000);
  });
});

