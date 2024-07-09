// +page.server.js
import { json } from '@sveltejs/kit';

export async function load({ request }) {
  try {
    const data = await request.json();
    const { originalText, changedText, originalFile, changedFile } = data;

    let diffResults = null;

    // Validate inputs before proceeding
    if ((originalFile && changedFile) || (originalText && changedText)) {
      try {
        if (originalFile && changedFile) {
          diffResults = await compareDocument(originalFile, changedFile);
        } else if (originalText && changedText) {
          diffResults = await compareText(originalText, changedText);
        }
      } catch (error) {
        console.error('Error during comparison:', error);
        diffResults = 'Error comparing files';
      }
    } else {
      diffResults = 'Missing input data for comparison';
    }

    return json({ diffResults });
  } catch (error) {
    console.error('Error processing request:', error);
    return json({ error: 'Internal server error' }, 500); // Return a 500 Internal Server Error response
  }
}
