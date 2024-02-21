const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function scrape() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
  
    await page.goto("https://food.grab.com/sg/en/");
  
    await page.type('input[id="location-input"]', "Choa Chu Kang North 6, Singapore, 689577");
    await page.click('button[class="ant-btn submitBtn___2roqB ant-btn-primary"]');
  
    // Wait for navigation to complete
    await page.waitForNavigation();
  
    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);
    
    // Extract restaurant list
    const restaurantSet = new Set();
    $('.ant-layout').each((index, element) => {
      const name = $(element).find('.ant-row-flex RestaurantListRow___1SbZY').text().trim();
      restaurantSet.add(name);
    });

    const uniqueRestaurantList = Array.from(restaurantSet).map(name => ({ name }));
    
    console.log(uniqueRestaurantList);
    
    // await browser.close();
  } catch (error) {
    console.error("Error during scraping:", error);
  }
}

scrape();







