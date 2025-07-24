import { getJobs, getHouses } from '../utils/scraper.js';

export const search = async (req, res) => {
  const { type, ...filters } = req.query;
  if (type === 'job') {
    const jobs = await getJobs(filters);
    res.json(jobs);
  } else if (type === 'house') {
    const houses = await getHouses(filters);
    res.json(houses);
  } else {
    res.status(400).json({ error: 'Invalid search type' });
  }
};