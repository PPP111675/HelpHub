import axios from "axios";
import JobListing from "../models/JobListing.js";

const APP_ID = "b7eccf12";
const APP_KEY = "121d4872e3fb1c6989fd8a9e5c0b0d1d";

export async function scrapeAdzunaJobs(
  query = "software developer",
  location = "Canada"
) {
  try {
    const response = await axios.get(
      "https://api.adzuna.com/v1/api/jobs/ca/search/1",
      {
        params: {
          app_id: APP_ID,
          app_key: APP_KEY,
          results_per_page: 20,
          what: query || "", // default to empty
          where: location || "Canada",
          contentType: "application/json",
        },
        timeout: 10000, // increase timeout
        headers: {
          "User-Agent": "Mozilla/5.0", // required by Adzuna (fixes some no-response issues)
          Accept: "application/json",
        },
        decompress: true, // ensure gzip works
      }
    );

    const jobs = response.data.results;

    if (!Array.isArray(jobs)) {
      console.log("❌ Unexpected response format:", response.data);
      return;
    }

    console.log(
      `\n🔎 Adzuna: Found ${jobs.length} jobs for "${query}" in "${location}":\n`
    );

    for (const job of jobs) {
      console.log(`• ${job.title} @ ${job.company?.display_name}`);
      console.log(`  📍 ${job.location?.display_name}`);
      console.log(`  🔗 ${job.redirect_url}`);
      console.log("---------------------------");

      await JobListing.updateOne(
        { url: job.redirect_url },
        {
          title: job.title,
          company: job.company?.display_name || "N/A",
          location: job.location?.display_name || "N/A",
          salary: job.salary_min ? `$${job.salary_min}` : "Not provided",
          summary: job.description?.slice(0, 200),
          url: job.redirect_url,
          source: "Adzuna",
          postedDate: new Date(job.created),
        },
        { upsert: true }
      );
    }

    console.log("\n✅ Adzuna scraping complete.\n");
   } catch (err) {
  console.error("❌ Error fetching from Adzuna:");
  if (err.code === 'ECONNABORTED') {
    console.error("❌ Timeout error. The request took too long.");
  } else if (err.response) {
    console.error("Status:", err.response.status);
    console.error("Data:", err.response.data);
  } else if (err.request) {
    console.error("❌ No response received from Adzuna:");
    console.error(err.request);
  } else {
    console.error("Unknown error:", err.message);
  }

}
}