const { Builder, Browser } = require("selenium-webdriver");
// cái dưới hàm độc lập còn mấy cái kia là phương thức của lớp được định nghĩa bên trong một lớp và thuộc về đối tượng của lớp đó , thao tác với các thuộc tính và phương thức khác của đối tượng
async function getBrowser(browser) {
  let driver;
  switch (browser) {
    case "chrome":
      // let chromeOptions = new chrome.Options(); // tạo biến mới để định nghĩa tuỳ chọn cho các option ví dụ như dòng dưới là 1 option ( nói chung là cấu hình cho các tuỳ chọn khi khởi động chỏmne)
      // chromeOptions.addArguments("--start-maximized");

      driver = await new Builder()
        .forBrowser(Browser.CHROME)
        // .setChromeOptions(chromeOptions)
        .build();
      break;
    case "firefox":
      driver = await new Builder().forBrowser(Browser.FIREFOX).build();
      break;
    case "safari":
      driver = await new Builder().forBrowser(Browser.SAFARI).build();
      break;

    default:
      console.log("Trình duyệt không hỗ trợ");
      break;
  }

  return driver;
}

module.exports = getBrowser;
