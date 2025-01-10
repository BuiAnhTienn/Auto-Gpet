const BasePage = require("../until/helper");
const LoginPage = require("../Pages/Login_Page");
const getBrowser = require("../until/Setup_Browser");
const {
  NOT_EXIST_USERNAME,
  DEFAULT_USERNAME,
  DEFAULT_PASSWORD,
  NOT_EXIST_PASSWORD,
  BLOCKED_USERNAME,
  BLOCKED_PASSWORD,
  NOT_FOUND_USERNAME,
  NOT_FOUND_PASSWORD,
} = require("../until/config");

let driver;
let loginpage;
let basepage;
before(async () => {
  const BROWSER = "chrome";
  driver = await getBrowser(BROWSER);
  loginpage = new LoginPage(driver);
  basepage = new BasePage(driver);
});
after(async () => {
  await driver.quit();
});
describe("Login ", () => {
  it("Login thất bại khi không nhập mật khẩu", async () => {
    await basepage.navigatePage();
    await driver.sleep(3000);
    await loginpage.enterUserName(DEFAULT_USERNAME);
    await driver.sleep(3000);
    await loginpage.clickButtonLogin();
    await driver.sleep(3000);
    await loginpage.findArlertInputPass();
    await driver.sleep(3000);
  });
  it("Login thất bại khi không nhập mật khẩu chính xác", async () => {
    await basepage.navigatePage();
    await driver.sleep(3000);
    await loginpage.loginPage(DEFAULT_USERNAME, NOT_EXIST_PASSWORD);
    await driver.sleep(3000);
  });
  it("Login thất bại khi tài khoản không tồn tại", async () => {
    await basepage.navigatePage();
    await driver.sleep(3000);
    await loginpage.loginPage(NOT_FOUND_USERNAME, NOT_FOUND_PASSWORD);
    await driver.sleep(3000);
    await loginpage.findArlerNotFound();
    await driver.sleep(3000);
  });
  it("Login thất bại khi tài khoản bị khoá", async () => {
    await basepage.navigatePage();
    await driver.sleep(3000);
    await loginpage.loginPage(BLOCKED_USERNAME, BLOCKED_PASSWORD);
    await driver.sleep(3000);
    await loginpage.findArlerBlockUser()
    await driver.sleep(3000);
  });
  it("Login thành công", async () => {
    await basepage.navigatePage();
    await driver.sleep(3000);
    await loginpage.loginPage(DEFAULT_USERNAME, DEFAULT_PASSWORD);
    await driver.sleep(3000);
    await loginpage.getUrlLoginPage();
    await driver.sleep(3000);
  });
});
