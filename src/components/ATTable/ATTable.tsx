import React, { FC, useMemo } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { TIngredients } from "../../shared/hooks/useGetIngredients";

export type ATTableProps = {
  apiData: TIngredients[];
};

export const ATTable: FC<ATTableProps> = ({ apiData }) => {
  const columnHelper = createColumnHelper<TIngredients>();

  //   const columns = useMemo(
  //     () => [
  //       columnHelper.group({
  //         header: "Name",
  //         columns: [
  //           columnHelper.accessor("Name", {
  //             // Make sure to use the correct property name, case-sensitive
  //             cell: (info) => info.getValue(),
  //             header: () => <span>Name</span>, // Optional: You can provide custom header components
  //           }),
  //         ],
  //       }),
  //       columnHelper.group({
  //         header: "Calories Per Gram",
  //         columns: [
  //           columnHelper.accessor("Calories", {
  //             // Make sure to use the correct property name, case-sensitive
  //             cell: (info) => info.getValue(),
  //             header: () => <span>Calories Per Gram</span>, // Optional: You can provide custom header components
  //           }),
  //         ],
  //       }),
  //     ],
  //     [columnHelper]
  //   );

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
  ); // Replace with your actual table rendering logic
};

export default ATTable;
