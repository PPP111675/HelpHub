import { scrapeAdzunaJobs } from '../scrapers/adzunaJobs.js';

export const triggerScraping = async (req, res) => {
  try {
    await scrapeAdzunaJobs();
    res.json({ message: 'Scraping triggered via Adzuna API' });
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: 'Scraping failed' });
  }
};
