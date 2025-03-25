import React, { useState } from 'react';
import { Camera } from './components/Camera';
import { Recipe } from './components/Recipe';
import { ChefHat, Loader2 } from 'lucide-react';
import type { Recipe as RecipeType } from './types';
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playCaptureSound = () => {
    try {
      const audio = new Audio('/sounds/snapshot.mp3');
      audio.play();
    } catch (err) {
      console.error('Error playing sound:', err);
    }
  };

  const handleCapture = (imageSrc: string) => {
    playCaptureSound();
    setCapturedImage(imageSrc);
    setRecipe(null);
    setError(null);
  };

  const analyzeImage = async () => {
    if (!capturedImage) return;

    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
      });

      const base64Data = capturedImage.split(',')[1];

      const prompt = `Analyze this image and generate a detailed recipe based on the visible ingredients. 
        Return ONLY a JSON response in this exact format (NO MARKDOWN, NO EXTRA TEXT):
        {
  "title": "string (creative/descriptive name based on ingredients)",
  "ingredients": ["string (include estimated quantities, e.g., '1/2 onion, diced')"],
  "instructions": ["string (logical, step-by-step methods; assume common techniques if unclear)"],
  "cookingTime": "string (estimate based on dish complexity)",
  "servings": "number (default to 2 if unclear)",
  "calories": "number (estimated total calories for the entire recipe)",
  "macros": {
    "carbs": "number (total carbohydrates in grams for the entire recipe)",
    "protein": "number (total protein in grams for the entire recipe)",
    "fat": "number (total fat in grams for the entire recipe)"
  },
  "notes": {
    "assumptions": ["string (e.g., 'Assumed garlic was peeled')"],
    "substitutions": ["string (e.g., 'Can substitute butter for oil')"]
  }
}`;

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Data
          }
        },
        prompt
      ]);

      const response = await result.response;
      const text = response.text().replace(/```json|```/g, '').trim();
      const recipeData = JSON.parse(text);
      setRecipe(recipeData);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#181A20] text-white py-4">
      <div className="w-full px-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ChefHat className="w-6 h-6 text-[#FCD535]" />
            <h1 className="text-2xl font-bold">Recipe Generator</h1>
          </div>
          <p className="text-gray-400 text-sm">Take a photo of your ingredients and we'll suggest an amazing recipe!</p>
        </div>

        <div className="space-y-6">
          <Camera onCapture={handleCapture} />

          {capturedImage && (
            <div className="text-center">
              <button
                onClick={analyzeImage}
                disabled={loading}
                className="w-full bg-[#FCD535] text-[#181A20] py-4 rounded-xl font-medium text-lg hover:bg-[#F0B90B] active:bg-[#F0B90B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Generate Recipe'
                )}
              </button>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {recipe && <Recipe recipe={recipe} />}
        </div>
      </div>
    </div>
  );
}

export default App;