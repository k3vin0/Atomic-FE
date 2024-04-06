import { FC, useMemo } from "react";
import { useGetRecipes } from "../../shared/hooks/useGetRecipes";

export type RecipesPageProps = {
  // Define your props here
};

export const RecipesPage: FC<RecipesPageProps> = () => {
  const { data } = useGetRecipes();
  const renderedRecipes = useMemo(() => {
    return data?.map((recipe, index) => (
      <div
        className="text-black bg-white"
        key={`${recipe.Name}-${index.toString}`}
      >
        {" "}
        {/* Make sure you use a unique key, ObjectID from your data would be a good candidate */}
        <h2>{recipe.Name}</h2>{" "}
        {/* Changed to h3 for semantics, replace with ul if it's a list */}
        {/* Ensure each ingredient also has a unique key */}
        {recipe.Ingredients.map((ingredient, index) => (
          <div>
            <li className="ml-5 text-black" key={index}>
              {ingredient.Name}
            </li>
          </div>
        ))}
      </div>
    ));
  }, [data]); // Dependencies array includes 'data', so the memoization will only recompute if 'data' changes

  return <div className="mt-3">{renderedRecipes}</div>;
};

export default RecipesPage;
