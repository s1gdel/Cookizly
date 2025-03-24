import React from 'react';
import { Clock, Users } from 'lucide-react';
import type { Recipe as RecipeType } from '../types';

interface RecipeProps {
  recipe: RecipeType;
}

export const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <div className="bg-[#1E2026] rounded-xl shadow-lg p-5 border border-gray-800">
      <h2 className="text-2xl font-bold text-[#FCD535] mb-4">{recipe.title}</h2>
      
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-400">
          <Clock className="w-5 h-5" />
          <span className="text-sm">{recipe.cookingTime}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Users className="w-5 h-5" />
          <span className="text-sm">{recipe.servings} servings</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-white">Ingredients</h3>
        <ul className="list-disc list-inside space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-300 text-sm leading-relaxed">{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Instructions</h3>
        <ol className="list-decimal list-inside space-y-3">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="text-gray-300 text-sm leading-relaxed">{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}