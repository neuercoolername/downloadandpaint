import contentArray from '../contentArray.js';

// Calculate chapter mapping based on mobile section structure
export const calculateChapterMapping = (isMobile = false) => {
  if (!isMobile) {
    // Desktop uses simple 1:1 mapping - each contentArray item gets one section
    const chapters = [];
    let sectionCount = 1; // Start with landing page
    
    contentArray.forEach((contentObj) => {
      sectionCount++; // Each content gets one section
      
      if (contentObj.title) {
        chapters.push({
          id: chapters.length + 1,
          title: contentObj.title,
          startSection: sectionCount,
          endSection: sectionCount // For desktop, start = end
        });
      }
    });
    
    return chapters;
  }

  // Mobile: Calculate based on ContentSectionMobile logic
  const chapters = [];
  let sectionCount = 1; // Start with 1 for landing page
  
  contentArray.forEach((contentObj, index) => {
    const contentLength = contentObj.content.length;
    const sectionsForThisContent = contentLength === 1 ? 1 : contentLength;
    
    if (contentObj.title) {
      chapters.push({
        id: chapters.length + 1,
        title: contentObj.title,
        startSection: sectionCount + 1, // +1 because we're adding sections after current count
        endSection: sectionCount + sectionsForThisContent // End section for this chapter
      });
    }
    
    sectionCount += sectionsForThisContent;
  });
  
  return chapters;
};

// Get current chapter based on section index
export const getCurrentChapter = (currentSectionIndex, isMobile = false) => {
  const chapters = calculateChapterMapping(isMobile);
  // Convert currentSectionIndex to FullPage section number (add 1 for 1-based indexing)
  const fullPageSectionIndex = currentSectionIndex + 1;
  
  return chapters.find(chapter => 
    fullPageSectionIndex >= chapter.startSection && 
    fullPageSectionIndex <= chapter.endSection
  );
};