import puppeteer from "puppeteer";
import "path";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    channel: "chrome",
  });
  const page = await browser.newPage();

  for(let pageNum = 30; pageNum > 1; pageNum--){
    await page.goto(
      `https://www.amazon.co.jp/hz/mycd/digital-console/contentlist/booksAll/dateDsc/?pageNumber=${pageNum}`
    );

    const allSelectSelector = "#SELECT-ALL";
    await page.waitForSelector(allSelectSelector);
    await page.click(allSelectSelector);

    const allDeliverSelector = "#BULK_DELIVER_ACTION_ID";
    await page.waitForSelector(allDeliverSelector);
    await page.click(allDeliverSelector);

    const deviceSelector =
      "#bulk_deliver_to_device_list .ActionList-module_action_list_item__LoNyc:nth-child(4) > div";
    await page.waitForSelector(deviceSelector);
    await page.click(deviceSelector);

    const allDeliverConfSelector = "#BULK_DELIVER_ACTION_ID_CONFIRM";
    await page.waitForSelector(allDeliverConfSelector);
    await page.click(allDeliverConfSelector);

    console.log(`page done - ${pageNum}`);

    await page.waitForTimeout(5000);
  }

  await browser.close();
})();
