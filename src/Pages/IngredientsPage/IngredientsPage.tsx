import { FC } from "react";
import { useGetIngredients } from "../../shared/hooks/useGetIngredients";
// import { RowData } from "../../components/ATTable/ATTable.archive";
import ATTable from "../../components/ATTable/ATTable";

export type IngredientsProps = {
  // Define your props here
};

export const IngredientsPage: FC<IngredientsProps> = () => {
  const { data } = useGetIngredients();

  console.log(data);

  return (
    <div>
      <div className="w-full">
        <ATTable apiData={data ?? []} />
      </div>
      {/* {data?.map((ingredient) => (
        <li>{ingredient.Name}</li>
      ))} */}
    </div>
  );
};

export default IngredientsPage;
