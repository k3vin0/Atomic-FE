import { FC, useMemo, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { TIngredients } from "../../shared/hooks/useGetIngredients";
import ATModal from "../ATModal/ATModal";

export type ATTableProps = {
  apiData: TIngredients[];
};

export const ATTable: FC<ATTableProps> = ({ apiData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState({
    ingredientTitle: "",
    body: "",
  });
  const [actionType, setActionType] = useState<string>("");
  const columnHelper = createColumnHelper<TIngredients>();

  const FooterButtonsDelete = () => {
    return (
      <div className="flex flex row gap-4">
        <button>Cancel</button>
        <button>Delete</button>
      </div>
    );
  };

  const FooterButtonsEdit = () => {
    return (
      <div className="flex flex row gap-4">
        <button>Cancel</button>
        <button>Edit</button>
      </div>
    );
  };

  const handleModalInfoDelete = (ingredientName: string) => {
    setModalInfo({
      ingredientTitle: `Delete ${ingredientName}`,
      body: `Are you sure you want to delete ${ingredientName}?`,
    });
  };

  const handleModalInfoEdit = (ingredientName: string) => {
    setModalInfo({
      ingredientTitle: `Edit ${ingredientName}`,
      body: `Edit ${ingredientName}?`,
    });
  };

  const handleDelete = (ingredient: TIngredients) => {
    setActionType("delete");
    handleModalInfoDelete(ingredient.Name);
    setIsModalOpen(true);
    console.log(ingredient);
  };

  const handleEdit = (ingredient: TIngredients) => {
    setActionType("edit");
    handleModalInfoEdit(ingredient.Name);
    setIsModalOpen(true);
    console.log(ingredient);
  };
  const columns = useMemo(
    () => [
      columnHelper.accessor("Name", {
        header: () => "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Calories", {
        header: () => "Calories Per Gram",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor(() => null, {
        // Provide an accessor function that returns null or some id if needed
        id: "edit", // You need to provide an id for columns that don't have an accessor key
        header: () => <span>Edit</span>,
        cell: (info) => (
          <button
            className="bg-cyan-500"
            onClick={() => handleEdit(info.row.original)}
          >
            Edit
          </button>
        ),
      }),
      columnHelper.accessor(() => null, {
        // Provide an accessor function that returns null or some id if needed
        id: "delete", // You need to provide an id for columns that don't have an accessor key
        header: () => <span>Delete</span>,
        cell: (info) => (
          <button
            className="bg-cyan-500"
            onClick={() => handleDelete(info.row.original)}
          >
            Delete
          </button>
        ),
      }),
    ],
    [columnHelper]
  );

  const data = useMemo(() => apiData, [apiData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Include any other plugins or options you need, for example:
    // getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // ...
  });

  // Render your table using the instance returned from useReactTable
  // ...

  return (
    <>
      <div className="w-full overflow-x-auto bg-white shadow-md">
        <table className="min-w-full leading-normal">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-left border-b text-black border-gray-200 bg-gray-100"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-black-600 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-200">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-5 py-2 border-b border-gray-200 text-black text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ATModal
        header={<div className="text-black">{modalInfo.ingredientTitle}</div>}
        body={<div className="text-black">{modalInfo.body}</div>}
        footer={
          <div className="">
            {actionType === "delete" ? (
              <FooterButtonsDelete />
            ) : (
              <FooterButtonsEdit />
            )}
          </div>
        }
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </>
  ); // Replace with your actual table rendering logic
};

export default ATTable;
