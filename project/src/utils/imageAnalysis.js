import { GoogleGenerativeAI } from "@google/generative-ai";
import Tesseract from "tesseract.js";
import { preprocessImage } from './imageProcessing';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Missing Gemini API key. Please set VITE_GEMINI_API_KEY in your .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const extractTextFromImage = async (image) => {
  try {
    // Preprocess image using enhanced browser-based processing
    const processedImageData = await preprocessImage(image);
    
    // Perform OCR on processed image with improved settings
    const result = await Tesseract.recognize(processedImageData, "eng", {
      logger: (info) => {
        if (info.status === 'recognizing text') {
          console.log(`Progress: ${(info.progress * 100).toFixed(2)}%`);
        }
      },
      tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,:%/()- ',
      tessedit_pageseg_mode: '1',
    });
    
    return result.data.text;
  } catch (error) {
    console.error("Image processing error:", error);
    throw new Error("Failed to process and extract text from image. Please try again.");
  }
};

export const analyzeTextWithAI = async (text) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured. Please check your .env file.");
  }

  if (!text.trim()) {
    throw new Error("No text was extracted from the image. Please try a clearer image.");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Analyze this food label content and provide a clear, structured analysis:

Overall Healthiness Rating:
[Rate from 1-5, where 5 is healthiest]

Key Nutritional Benefits:
[List main benefits]

Potential Health Concerns:
[List any concerns]

Recommended Consumption:
[Provide frequency guidelines]

Special Considerations:
[List allergies and dietary notes]

Food Label Content:
${text}

Format the response with clear headings and bullet points for easy reading.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(
      error.message?.includes("API key")
        ? "Invalid API key. Please check your environment configuration."
        : "Failed to analyze the food label. Please try again."
    );
  }
};