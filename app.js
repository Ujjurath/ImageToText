const tesseract = require('tesseract.js');
const fs = require('fs');

async function extractMarkedCheckboxesFromImage(imagePath) {
  try {
    await tesseract.recognize(imagePath, 'eng', { logger: m => console.log(m) });
    const { data: { text } } = await tesseract.recognize(imagePath, 'eng');

    // Identify and extract marked checkboxes
    let userText = '';
const markedCheckboxes = [];

    const lines = text.split('\n');
    for(let line of lines) {

        if(line.startsWith('[x]')) {
          markedCheckboxes.push(line.slice(3).trim());
        } else {
          userText += line + '\n'; 
        }
      
      }
      

      return {
        userText,
        markedCheckboxes
      };
      
  } catch (error) {
    console.error('Error reading image:', error);
    return []; // Return empty array on error
  }
}

// Example usage:
const filePath = '/Users/ujjawalrathore/Desktop/nodeex/20231113135539935138000000-7.jpg';
extractMarkedCheckboxesFromImage(filePath)
  .then(checkboxes => console.log(checkboxes))
  .catch(error => console.error(error));

