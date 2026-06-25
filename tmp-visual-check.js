const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 633 }, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const metricsBefore = await page.evaluate(() => {
    const main = document.querySelector('main');
    return { scrollHeight: main.scrollHeight, clientHeight: main.clientHeight, max: main.scrollHeight - main.clientHeight };
  });
  await page.evaluate(() => {
    const main = document.querySelector('main');
    main.scrollTop = main.scrollHeight - main.clientHeight;
  });
  await page.waitForTimeout(400);
  const metricsAfter = await page.evaluate(() => {
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const word = footer?.querySelector('[aria-hidden="true"]');
    const footerRect = footer?.getBoundingClientRect();
    const wordRect = word?.getBoundingClientRect();
    return {
      scrollTop: main.scrollTop,
      max: main.scrollHeight - main.clientHeight,
      footerRect: footerRect && { top: footerRect.top, bottom: footerRect.bottom, height: footerRect.height },
      wordRect: wordRect && { top: wordRect.top, bottom: wordRect.bottom, width: wordRect.width, height: wordRect.height },
      viewport: { width: innerWidth, height: innerHeight },
      bodyScrollWidth: document.body.scrollWidth,
      docClientWidth: document.documentElement.clientWidth,
    };
  });
  await page.screenshot({ path: '/home/ayaz/Desktop/agency/footer-desktop.png', fullPage: false });
  await browser.close();
  console.log(JSON.stringify({ metricsBefore, metricsAfter }, null, 2));
})();
