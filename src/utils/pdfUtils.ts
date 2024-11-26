import PDFParser from 'pdf-parse';

export interface QAEntry {
  question: string;
  answer: string;
}

export const extractQAFromPDF = async (pdfBuffer: ArrayBuffer): Promise<QAEntry[]> => {
  try {
    console.log("Starting PDF extraction");
    const data = await PDFParser(pdfBuffer);
    const text = data.text;
    
    // Split text into Q&A pairs (assuming format "Q: ... A: ...")
    const qaRegex = /Q:\s*(.*?)\s*A:\s*(.*?)(?=(?:\n\s*Q:|$))/gs;
    const matches = [...text.matchAll(qaRegex)];
    
    console.log(`Found ${matches.length} Q&A pairs in PDF`);
    
    return matches.map(match => ({
      question: match[1].trim(),
      answer: match[2].trim()
    }));
  } catch (error) {
    console.error("Error extracting Q&A from PDF:", error);
    throw error;
  }
}

export const findBestMatch = (query: string, qaList: QAEntry[]): string => {
  console.log("Finding best match for query:", query);
  
  // Simple word matching score
  const getMatchScore = (text: string, searchQuery: string): number => {
    const words = searchQuery.toLowerCase().split(' ');
    const textLower = text.toLowerCase();
    return words.filter(word => textLower.includes(word)).length / words.length;
  };

  let bestMatch = qaList[0];
  let bestScore = 0;

  qaList.forEach(qa => {
    const score = getMatchScore(qa.question, query);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  });

  console.log("Best match score:", bestScore);
  return bestScore > 0.3 ? bestMatch.answer : "I couldn't find a relevant answer in my knowledge base.";
}