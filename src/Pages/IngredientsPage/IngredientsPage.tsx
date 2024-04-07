import { FC } from "react";
import { useGetIngredients } from "../../shared/hooks/useGetIngredients";
// import { RowData } from "../../components/ATTable/ATTable.archive";
import ATTable from "../../components/ATTable/ATTable";

export type IngredientsProps = {
  // Define your props here
};

export const IngredientsPage: FC<IngredientsProps> = () => {
  const { data } = useGetIngredients();

  return (
    <div className="mt-3 w-full">
      <ATTable apiData={data ?? []} />
    </div>
  );
};

export default IngredientsPage;
