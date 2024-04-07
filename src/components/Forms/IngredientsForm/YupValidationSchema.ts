import * as Yup from "yup";

export const IngredientFormSchema = Yup.object().shape({
  ingredientName: Yup.string()
    .required("Ingredient name is required")
    .min(2, "Name is too short - should be 2 chars minimum."),
  ingredientCalories: Yup.number()
    .required("Calories are required")
    .positive("Calories must be positive")
    .integer("Calories must be an integer"),
});

export const EditIngredientFormSchema = Yup.object().shape({
  ingredientName: Yup.string().min(
    2,
    "Name is too short - should be 2 chars minimum."
  ),
  ingredientCalories: Yup.number()
    .positive("Calories must be positive")
    .integer("Calories must be an integer"),
});
