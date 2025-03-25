import React from 'react';
import { Clock, Users, Nut } from 'lucide-react';
import type { Recipe as RecipeType } from '../types';

interface RecipeProps {
  recipe: RecipeType;
}

export const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  const caloriesPerServing = recipe.calories ? Math.round(recipe.calories / recipe.servings) : null;
  const carbsPerServing = recipe.macros?.carbs ? Math.round(recipe.macros.carbs / recipe.servings) : null;
  const proteinPerServing = recipe.macros?.protein ? Math.round(recipe.macros.protein / recipe.servings) : null;
  const fatPerServing = recipe.macros?.fat ? Math.round(recipe.macros.fat / recipe.servings) : null;

  return (
    <div className="bg-[#1E2026] rounded-xl shadow-lg p-5 border border-gray-800">
      <h2 className="text-2xl font-bold text-[#FCD535] mb-4">{recipe.title}</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-400">
          <Clock className="w-5 h-5" />
          <span className="text-sm">{recipe.cookingTime}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Users className="w-5 h-5" />
          <span className="text-sm">{recipe.servings} servings</span>
        </div>
        {(recipe.calories || recipe.macros) && (
          <div className="flex items-center gap-2 text-gray-400">
            <Nut className="w-5 h-5" />
            <span className="text-sm">Nutrition Info</span>
          </div>
        )}
      </div>

      {}
      {(recipe.calories || recipe.macros) && (
        <div className="mb-6 bg-[#2B3139] p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-white">Nutritional Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recipe.calories && (
              <div>
                <p className="text-gray-400 text-xs mb-1">Calories</p>
                <p className="text-white font-medium">
                  {Math.round(recipe.calories)} total
                  {caloriesPerServing && (
                    <span className="text-gray-400 text-xs block mt-1">{caloriesPerServing}/serving</span>
                  )}
                </p>
              </div>
            )}
            {recipe.macros?.carbs && (
              <div>
                <p className="text-gray-400 text-xs mb-1">Carbs</p>
                <p className="text-white font-medium">
                  {Math.round(recipe.macros.carbs)}g
                  {carbsPerServing && (
                    <span className="text-gray-400 text-xs block mt-1">{carbsPerServing}g/serving</span>
                  )}
                </p>
              </div>
            )}
            {recipe.macros?.protein && (
              <div>
                <p className="text-gray-400 text-xs mb-1">Protein</p>
                <p className="text-white font-medium">
                  {Math.round(recipe.macros.protein)}g
                  {proteinPerServing && (
                    <span className="text-gray-400 text-xs block mt-1">{proteinPerServing}g/serving</span>
                  )}
                </p>
              </div>
            )}
            {recipe.macros?.fat && (
              <div>
                <p className="text-gray-400 text-xs mb-1">Fat</p>
                <p className="text-white font-medium">
                  {Math.round(recipe.macros.fat)}g
                  {fatPerServing && (
                    <span className="text-gray-400 text-xs block mt-1">{fatPerServing}g/serving</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

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
};