import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import JobListing from '../models/JobListing.js';

puppeteer.use(StealthPlugin());

export async function scrapeIndeedJobs(query = 'software developer', location = 'Toronto') {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const url = `https://ca.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(location)}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Wait for job cards (Cloudflare sometimes blocks without stealth)
  try {
    await page.waitForSelector('[data-jk]', { timeout: 20000 });
  } catch (err) {
    await page.screenshot({ path: 'indeed_blocked.png' });
    console.error('⚠️ Cloudflare block or no jobs found. Screenshot saved to indeed_blocked.png');
    throw err;
  }

  const jobs = await page.evaluate(() => {
    const cards = document.querySelectorAll('[data-jk]');
    const results = [];

    cards.forEach(card => {
      const title = card.querySelector('h2 span')?.innerText;
      const company = card.querySelector('.companyName')?.innerText;
      const location = card.querySelector('.companyLocation')?.innerText;
      const summary = card.querySelector('.job-snippet')?.innerText?.trim();
      const salary = card.querySelector('.salary-snippet')?.innerText;
      const link = card.querySelector('a')?.getAttribute('href');
      const url = link ? `https://ca.indeed.com${link}` : '';

      if (title && url) {
        results.push({ title, company, location, summary, salary, url });
      }
    });

    return results;
  });

  console.log(`🔎 Scraped ${jobs.length} jobs from Indeed:\n`);
  for (const job of jobs) {
    console.log(`• ${job.title} — ${job.company}`);
    console.log(`  ${job.url}`);
  }

  for (const job of jobs) {
    try {
      await JobListing.updateOne(
        { url: job.url },
        { ...job, source: 'Indeed', postedDate: new Date() },
        { upsert: true }
      );
    } catch (err) {
      console.error('❌ MongoDB error:', err.message);
    }
  }

  await browser.close();
  console.log('\n✅ Indeed scraping complete.\n');
}
