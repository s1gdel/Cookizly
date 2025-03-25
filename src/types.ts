export type Macros = {
  carbs?: number;
  protein?: number;
  fat?: number;
};

export type Recipe = {
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  calories?: number;
  macros?: Macros;
  notes: {
    assumptions: string[];
    substitutions: string[];
  };
};