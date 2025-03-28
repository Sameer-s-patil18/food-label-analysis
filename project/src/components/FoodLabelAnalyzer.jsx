import React, { useState, useEffect } from "react";
import Header from "./Header";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";
import AnalyzeButton from "./AnalyzeButton";
import ExtractedText from "./Results/ExtractedText";
import AIRecommendation from "./Results/AIRecommendation";
import { extractTextFromImage, analyzeTextWithAI } from "../utils/imageAnalysis";
import { handleError } from "../utils/errorHandling";

const FoodLabelAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Check for API key on component mount
  useEffect(() => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      console.warn("Gemini API key is not set. Please configure your .env file.");
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        handleError("File size must be less than 10MB");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!image) {
      handleError("Please upload an image first.");
      return;
    }

    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      handleError("Please configure your Gemini API key in the .env file.");
      return;
    }

    setLoading(true);
    setExtractedText("");
    setRecommendation("");

    try {
      const text = await extractTextFromImage(image);
      setExtractedText(text);
      const analysis = await analyzeTextWithAI(text);
      setRecommendation(analysis);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 space-y-6">
          <Header />
          
          <div className="space-y-6">
            <ImageUploader onImageUpload={handleImageUpload} />
            <ImagePreview src={imagePreview} />
            <AnalyzeButton
              onClick={processImage}
              loading={loading}
              disabled={loading || !image}
            />
          </div>

          <ExtractedText text={extractedText} />
          <AIRecommendation recommendation={recommendation} />
        </div>
      </div>
    </div>
  );
};

export default FoodLabelAnalyzer;