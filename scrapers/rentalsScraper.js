import puppeteer from 'puppeteer';
import RentalListing from '../models/RentalListing.js';

export async function scrapeRentalsCa() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://rentals.ca/toronto', { waitUntil: 'domcontentloaded' });

  // Wait for listings to appear
  await page.waitForSelector('.property-tile');

  const listings = await page.evaluate(() => {
    const results = [];
    const tiles = document.querySelectorAll('.property-tile');

    tiles.forEach(tile => {
      const title = tile.querySelector('.property-title')?.innerText || 'No title';
      const price = tile.querySelector('.price')?.innerText || 'No price';
      const address = tile.querySelector('.address')?.innerText || 'No address';
      const url = tile.querySelector('a')?.href || '';

      if (title && url) {
        results.push({ title, price, address, url });
      }
    });

    return results;
  });

  console.log(`\n🔎 Scraped ${listings.length} listings from Rentals.ca:\n`);
  listings.forEach((l, i) => {
    console.log(`[${i + 1}] ${l.title} — ${l.price}`);
    console.log(`     ${l.address}`);
    console.log(`     ${l.url}`);
    console.log('------------------------------');
  });

  for (const listing of listings) {
    try {
      await RentalListing.updateOne(
        { url: listing.url },
        {
          ...listing,
          source: "Rentals.ca",
          postedDate: new Date(),
        },
        { upsert: true }
      );
    } catch (err) {
      console.error('❌ DB Save Error:', err.message);
    }
  }

  await browser.close();
  console.log('\n✅ Rentals.ca scraping done.\n');
}
