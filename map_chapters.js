const contentArray = require('./src/contentArray.js');

// The landing page is section 1 (index 0)
// Content sections start from section 2 (index 1)

console.log('Content Array Mapping:');
console.log('Landing Page: Section 1 (Index 0)');

contentArray.forEach((content, index) => {
  const fullPageSection = index + 2; // +2 because landing page is section 1
  console.log(`Section ${fullPageSection} (Index ${index + 1}): ID ${content.id}${content.title ? ` - "${content.title}"` : ''}`);
});

console.log('\nChapter Title Positions:');
const chapterTitles = [
  "Painter by the Wall",
  "Walls and Windows", 
  "Bird droppings",
  "Download and Paint Like A Master",
  "Hidden treasures of creativity",
  "Center and Periphery"
];

chapterTitles.forEach(title => {
  const foundIndex = contentArray.findIndex(content => content.title === title);
  if (foundIndex !== -1) {
    const fullPageSection = foundIndex + 2;
    console.log(`"${title}": Section ${fullPageSection} (Array Index ${foundIndex})`);
  }
});