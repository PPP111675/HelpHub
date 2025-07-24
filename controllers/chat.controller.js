import axios from 'axios';
import { translateText } from '../utils/translator.js';

// ⚠️ SECURITY WARNING: Never expose API keys in client-side code
// These should be in environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBUm7tkTtE0bydZC6IChnm0rkyvQhAoZ-w';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID || "b7eccf12";
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY || "121d4872e3fb1c6989fd8a9e5c0b0d1d";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "ab13ebe236msh4bb24e769f314cfp1fe955jsn882fb4b174d6";
const RAPIDAPI_HOST = "zumper-com-scraper.p.rapidapi.com";

// ────────────── INTENTS ─────────────────

async function handleJobSearchIntent(translated) {
  try {
    const regex = /(.*?)\s*jobs?\s+in\s+(.+)/i;
    const match = translated.match(regex);
    const keyword = match?.[1]?.trim() || 'developer';
    const location = match?.[2]?.trim() || 'Canada';

    const url = `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${encodeURIComponent(
      keyword
    )}&where=${encodeURIComponent(location)}&sort_by=relevance&full_time=1`;

    const response = await axios.get(url, {
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': 'JobSearchBot/1.0'
      }
    });

    const results = response.data?.results?.slice(0, 3);

    if (!results || results.length === 0) {
      return `No ${keyword} jobs found in ${location}. Try different keywords or locations.`;
    }

    const jobList = results
      .map((job) => {
        const title = job.title || 'Job Title Not Available';
        const company = job.company?.display_name || 'Company Not Listed';
        const loc = job.location?.display_name || location;
        const salary = job.salary_min && job.salary_max 
          ? `💰 $${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
          : '';
        const url = job.redirect_url || '#';
        
        return `🔹 **${title}** at *${company}* in ${loc}\n${salary}\n[Apply Now](${url})`;
      })
      .join('\n\n');

    return `Found ${results.length} job(s) for "${keyword}" in ${location}:\n\n${jobList}`;

  } catch (error) {
    console.error('Job search error:', error.message);
    return 'Sorry, I encountered an error while searching for jobs. Please try again later.';
  }
}

async function handleRentalSearchIntent(translated) {
  try {
    const regex = /rentals?\s+(?:in|at)\s+(.+)/i;
    const match = translated.match(regex);
    const location = match?.[1]?.trim() || 'toronto';
    
    // Try different city slug formats
    const cityOptions = [
      location.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      `${location.toLowerCase().replace(/\s+/g, '-')}-on`, // Add province for Canadian cities
      location.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, ''),
    ];

    let results = null;
    let response = null;

    // Try different city slug formats
    for (const citySlug of cityOptions) {
      try {
        const url = `https://${RAPIDAPI_HOST}/properties/search`;
        
        response = await axios.post(
          url,
          {
            url: citySlug,
            offset: 0,
            type: 'longTerm',
            limit: 10
          },
          {
            timeout: 15000,
            headers: {
              'Content-Type': 'application/json',
              'x-rapidapi-key': RAPIDAPI_KEY,
              'x-rapidapi-host': RAPIDAPI_HOST,
            },
          }
        );

        if (response.data?.listables && response.data.listables.length > 0) {
          results = response.data.listables;
          break;
        }
      } catch (slugError) {
        console.log(`Failed to fetch with slug: ${citySlug}`);
        continue;
      }
    }
    
    if (!results || results.length === 0) {
      return `No rental listings found in ${location}. Try searching for cities like "Toronto", "Vancouver", or "Montreal".`;
    }

    // Filter and process results
    const processedResults = results
      .filter(property => property && (property.title || property.name))
      .slice(0, 3)
      .map((property) => {
        // Extract property details with multiple fallbacks
        const title = property.title || property.name || property.address || 'Rental Property';
        
        // Try different price fields
        const price = property.price_formatted || 
                     property.price || 
                     (property.rent ? `${property.rent}/month` : null) ||
                     (property.price_min ? `From ${property.price_min}/month` : null) ||
                     'Contact for price';
        
        // Extract bedroom/bathroom info
        const beds = property.bedrooms || property.beds || property.bedroom_count;
        const baths = property.bathrooms || property.baths || property.bathroom_count;
        
        const bedsText = beds ? `${beds} bed${beds > 1 ? 's' : ''}` : '';
        const bathsText = baths ? `${baths} bath${baths > 1 ? 's' : ''}` : '';
        const details = [bedsText, bathsText].filter(Boolean).join(', ');
        
        // Construct proper URL
        let propertyUrl = '#';
        if (property.detail_url) {
          propertyUrl = property.detail_url.startsWith('http') 
            ? property.detail_url 
            : `https://www.zumper.com${property.detail_url}`;
        } else if (property.url) {
          propertyUrl = property.url.startsWith('http') 
            ? property.url 
            : `https://www.zumper.com${property.url}`;
        } else if (property.id) {
          propertyUrl = `https://www.zumper.com/apartments-for-rent/${property.id}`;
        }
        
        // Extract additional info
        const address = property.address || property.neighborhood || '';
        const addressText = address && address !== title ? `📍 ${address}` : '';
        
        return `🏠 **${title}** - ${price}\n${details ? `📋 ${details}\n` : ''}${addressText ? `${addressText}\n` : ''}[View Listing](${propertyUrl})`;
      });

    if (processedResults.length === 0) {
      return `Found listings in ${location}, but couldn't extract property details. Please try a different search.`;
    }

    return `Found ${processedResults.length} rental(s) in ${location}:\n\n${processedResults.join('\n\n')}`;

  } catch (error) {
    console.error('Rental search error:', error.message);
    console.error('Full error:', error);
    
    // Fallback: provide general rental search advice
    return `Sorry, I encountered an error while searching for rentals in that location. Here are some popular rental sites you can try:

🏠 **Zumper**: https://www.zumper.com
🏠 **Rentals.com**: https://www.rentals.com  
🏠 **PadMapper**: https://www.padmapper.com
🏠 **Kijiji**: https://www.kijiji.ca (for Canada)

Try searching directly on these platforms for better results.`;
  }
}

async function handleGeminiFallback(translated) {
  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [{ 
          parts: [{ text: translated }] 
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      },
      {
        timeout: 15000, // 15 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!reply) {
      return 'I apologize, but I cannot generate a response right now. Please try again.';
    }

    return reply;

  } catch (error) {
    console.error('Gemini API error:', error.message);
    return 'I apologize, but I cannot process your request right now. Please try again later.';
  }
}

// ────────────── MAIN BOT CONTROLLER ─────────────────

export const chatWithBot = async (req, res) => {
  try {
    const { message, language = 'en' } = req.body;
    
    // Input validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Message is required and must be a non-empty string' 
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({ 
        error: 'Message is too long. Please keep it under 1000 characters.' 
      });
    }

    // Translate to English if needed
    let translated = message.trim();
    if (language !== 'en') {
      try {
        translated = await translateText(message, language, 'en');
      } catch (translationError) {
        console.error('Translation error:', translationError.message);
        // Continue with original message if translation fails
        translated = message;
      }
    }

    let reply = '';

    // Intent detection with more specific patterns
    const jobPattern = /(?:job|career|work|employment|hiring|position)/i;
    const rentalPattern = /(?:rent|rental|apartment|house|lease|housing)/i;

    if (jobPattern.test(translated)) {
      reply = await handleJobSearchIntent(translated);
    } else if (rentalPattern.test(translated)) {
      reply = await handleRentalSearchIntent(translated);
    } else {
      reply = await handleGeminiFallback(translated);
    }

    // Translate reply back if needed
    let finalReply = reply;
    if (language !== 'en') {
      try {
        finalReply = await translateText(reply, 'en', language);
      } catch (translationError) {
        console.error('Reply translation error:', translationError.message);
        // Return English reply if translation fails
        finalReply = reply;
      }
    }

    res.json({ 
      reply: finalReply,
      originalLanguage: language,
      translatedQuery: language !== 'en' ? translated : null
    });

  } catch (error) {
    console.error('Chat controller error:', error);
    
    // Don't expose internal error details to client
    res.status(500).json({ 
      error: 'An internal server error occurred. Please try again later.' 
    });
  }
};