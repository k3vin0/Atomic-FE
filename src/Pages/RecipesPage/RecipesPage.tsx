import React, { FC, useMemo } from "react";
import { useGetRecipes } from "../../shared/hooks/useGetRecipes";

export type RecipesPageProps = {
  // Define your props here
};

export const RecipesPage: FC<RecipesPageProps> = () => {
  const { data } = useGetRecipes();
  console.log(data);
  const renderedRecipes = useMemo(() => {
    return data?.map((recipe, index) => (
      <div className="bg-black" key={`${recipe.Name}-${index.toString}`}>
        {" "}
        {/* Make sure you use a unique key, ObjectID from your data would be a good candidate */}
        <h2>{recipe.Name}</h2>{" "}
        {/* Changed to h3 for semantics, replace with ul if it's a list */}
        {/* Ensure each ingredient also has a unique key */}
        {recipe.Ingredients.map((ingredient, index) => (
          <li className="ml-5" key={index}>
            {ingredient.Name}
          </li>
        ))}
      </div>
    ));
  }, [data]); // Dependencies array includes 'data', so the memoization will only recompute if 'data' changes

  return <div>{renderedRecipes}</div>;
};

export default RecipesPage;
