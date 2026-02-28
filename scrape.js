const { chromium } = require("playwright");

(async () => {

  const seeds = [84,85,86,87,88,89,90,91,92,93];
  const baseUrl = "https://sanand0.github.io/tdsdata/js_table/?seed=";

  let total = 0;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const seed of seeds) {

    await page.goto(baseUrl + seed);

    // get only visible text inside body
    const text = await page.locator("body").innerText();

    // split by spaces/newlines safely
    const numbers = text
      .split(/\s+/)
      .map(Number)
      .filter(n => !isNaN(n));

    const sum = numbers.reduce((a,b)=>a+b,0);

    total += sum;

    console.log(`Seed ${seed} sum: ${sum}`);
  }

  console.log("FINAL TOTAL =", total);

  await browser.close();

})();
