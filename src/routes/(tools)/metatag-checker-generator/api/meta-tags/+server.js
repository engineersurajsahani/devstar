import { json } from '@sveltejs/kit';
import * as cheerio from 'cheerio';

export async function POST({ request }) {
  const { url } = await request.json();
  
  try {
    const response = await fetch(url);
    const html = await response.text();
    const extractedData = extractAllData(html);
    return json(extractedData);
  } catch (error) {
    console.error('Server error:', error);
    return json({ error: 'Failed to fetch or parse data' }, { status: 500 });
  }
}

function extractAllData(html) {
  const $ = cheerio.load(html);
  const data = {
    metaTags: {},
    title: $('title').text(),
    headers: {},
    links: [],
    scripts: []
  };

  // Extract meta tags
  $('meta').each((i, elem) => {
    const name = $(elem).attr('name') || $(elem).attr('property');
    const content = $(elem).attr('content');
    if (name && content) {
      data.metaTags[name] = content;
    }
  });

  // Extract headers (h1, h2, h3)
  ['h1', 'h2', 'h3'].forEach(tag => {
    data.headers[tag] = [];
    $(tag).each((i, elem) => {
      data.headers[tag].push($(elem).text());
    });
  });

  // Extract links
  $('a').each((i, elem) => {
    data.links.push({
      href: $(elem).attr('href'),
      text: $(elem).text()
    });
  });

  // Extract scripts
  $('script').each((i, elem) => {
    const src = $(elem).attr('src');
    if (src) {
      data.scripts.push(src);
    }
  });

  return data;
}