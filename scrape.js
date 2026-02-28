const { chromium } = require("playwright");

(async () => {

  // Seeds given in assignment
  const seeds = [84, 85, 86, 87, 88, 89, 90, 91, 92, 93];

  // Base URL (IMPORTANT: no number at end)
  const baseUrl = "https://sanand0.github.io/tdsdata/js_table/?seed=";

  let total = 0;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const seed of seeds) {

    await page.goto(baseUrl + seed);

    // Get all text from page (numbers are plain text, not table cells)
    const text = await page.textContent("body");

    // Extract numbers using regex
    const numbers = text.match(/\d+/g).map(Number);

    // Sum numbers for this seed
    const sum = numbers.reduce((a, b) => a + b, 0);

    total += sum;

    console.log(`Seed ${seed} sum: ${sum}`);
  }

  console.log("FINAL TOTAL =", total);

  await browser.close();

})();
