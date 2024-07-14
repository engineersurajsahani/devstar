import express from "express";
import axios from "axios";
import cheerio from "cheerio";
import cors from "cors";
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(cors());
 
app.get("/fetch-links", async (req, res) => {  // Monika Updated Code: Marked the function as 'async'
  const inputUrl = req.query.url;
  if (!inputUrl) {
    return res.status(400).send("URL is required");
  }
 
  try {
    const response = await axios.get(inputUrl);
    const $ = cheerio.load(response.data);
    const inputUrlHost = new URL(inputUrl).host;
    const links = [];
   
    const fetchLinkStatus = async (url) => {  // Monika Updated Code: Created a helper function to handle async status checks
      try {
        const linkResponse = await axios.head(url);
        return linkResponse.status;
      } catch (err) {
        return err.response ? err.response.status : 500;
      }
    };
 
    $("a").each((index, element) => {
      const href = $(element).attr("href");
      let text = $(element).text().trim();
      const img = $(element).find("img");
      let type = "Text";
      if (img.length > 0) {
        text = img.attr("alt") || "Image";
        type = "Image";
      }
      const rel = $(element).attr("rel");
      const isNoFollow = rel && rel.includes("nofollow");
      const followStatus = isNoFollow ? "No follow" : "Do follow";
      if (href) {
        const fullUrl = new URL(href, inputUrl).href; // Construct the full URL
        const linkHost = new URL(fullUrl).host;
        const isInternal = linkHost === inputUrlHost ? "Yes" : "No";
        links.push({ href: fullUrl, text, type, followStatus, isInternal });
      }
    });
 
    for (let i = 0; i < links.length; i++) {  // Monika Updated Code: Fetching status for each link
      links[i].status = await fetchLinkStatus(links[i].href);
    }
 
    res.json(links);
  } catch (error) {
    console.error(`Error fetching the HTML content from ${inputUrl}:`, error);
    res.status(500).send("Error fetching the links");
  }
});
 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 