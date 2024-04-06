import { FC } from "react";
import { Formik, Form, Field } from "formik";
import { IngredientFormSchema } from "./YupValidationSchema";

export type IngredientFormValues = {
  ingredientName: string;
  ingredientCalories: string;
};

type IngredientFormProps = {
  onSubmit: (values: IngredientFormValues) => void;
};

export const IngredientForm: FC<IngredientFormProps> = ({ onSubmit }) => {
  return (
    <div className="grid p-4 grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Ingredient Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Fill out the name and calories for your ingredient
        </p>
      </div>

      <Formik
        initialValues={{
          ingredientName: "",
          ingredientCalories: "",
        }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
        validationSchema={IngredientFormSchema}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="ingredientName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ingredient Name
                  </label>
                  <div className="mt-2">
                    <Field
                      type="text"
                      name="ingredientName"
                      id="ingredientName"
                      className="block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {touched.ingredientName && errors.ingredientName && (
                      <div className="text-red-500 text-xs">
                        {errors.ingredientName}
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="ingredientCalories"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Calories
                  </label>
                  <div className="mt-2">
                    <Field
                      type="number"
                      name="ingredientCalories"
                      id="ingredientCalories"
                      className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {touched.ingredientCalories &&
                      errors.ingredientCalories && (
                        <div className="text-red-500 text-xs">
                          {errors.ingredientCalories}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="reset"
                className="text-sm bg-white font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default IngredientForm;
