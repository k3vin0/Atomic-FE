import { FC, useCallback, useMemo, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { TIngredients } from "../../shared/hooks/useGetIngredients";
import ATModal from "../ATModal/ATModal";
import { Transition } from "@headlessui/react";
import IngredientForm, {
  IngredientFormValues,
} from "../Forms/IngredientsForm/IngredientForm";
import {
  IngredientData,
  useAddIngredients,
} from "../../shared/hooks/useAddIngredients";
import { useQueryClient } from "@tanstack/react-query";
import { SearchComponet } from "../../Pages/IngredientsPage/components/Search";
import { useDeleteIngredient } from "../../shared/hooks/useDeleteIngredientByName";
import { useUpdateIngredient } from "../../shared/hooks/useUpdateIngredient";

export type ATTableProps = {
  apiData: TIngredients[];
};

export const ATTable: FC<ATTableProps> = ({ apiData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [test, setTest] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState({
    ingredientTitle: "",
    body: "",
  });
  const [actionType, setActionType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ingredientName, setIngredientName] = useState<string>("");
  const [ingredientPrefillName, setIngredientPrefillName] =
    useState<string>("");
  const [ingredientCalories, setIngredientCalories] = useState<number | null>(
    null
  );
  const [ingredientID, setIngredientID] = useState<string>("");
  const columnHelper = createColumnHelper<TIngredients>();

  const ingredientQuery = useAddIngredients();
  const { mutate: deleteIngredient } = useDeleteIngredient();
  const updateMutation = useUpdateIngredient();

  const queryClient = useQueryClient();

  const HandleDeleteIngredientByName = () => {
    deleteIngredient(ingredientName, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        setIsModalOpen(false);
      },
    });
  };
  const FooterButtonsDelete = () => {
    return (
      <div className="flex row gap-4">
        <button className="bg-indigo-600">Cancel</button>
        <button
          className="bg-indigo-600"
          onClick={() => HandleDeleteIngredientByName()}
        >
          Delete
        </button>
      </div>
    );
  };

  const FooterButtonsEdit = () => {
    return (
      <div className="flex row gap-4">
        <button className="bg-indigo-600">Cancel</button>
        <button className="bg-indigo-600">Edit</button>
      </div>
    );
  };

  const handleModalInfoDelete = useCallback(
    (ingredientName: string) => {
      setModalInfo({
        ingredientTitle: `Delete ${ingredientName}`,
        body: `Are you sure you want to delete ${ingredientName}?`,
      });
      setIngredientName(ingredientName);
    },
    [setModalInfo, setIngredientName]
  );

  const handleModalInfoEdit = useCallback(
    (ingredientName: string) => {
      setModalInfo({
        ingredientTitle: `Edit ${ingredientName}`,
        body: `Edit ${ingredientName}?`,
      });
    },
    [setModalInfo]
  );

  const handleDelete = useCallback(
    (ingredient: TIngredients) => {
      setActionType("delete");
      handleModalInfoDelete(ingredient.Name);
      setIsModalOpen(true);
      console.log(ingredient);
    },
    [setActionType, handleModalInfoDelete, setIsModalOpen]
  );

  const handleEdit = useCallback(
    (ingredient: Partial<TIngredients & { ObjectID: string }>) => {
      setActionType("edit");
      handleModalInfoEdit(ingredient.Name ?? "");
      setShowForm(true);
      // setIsModalOpen(true);
      setIngredientID(ingredient.ObjectID ?? "");
      if (ingredient.Calories) {
        setIngredientCalories(parseInt(ingredient.Calories) ?? null);
      }
      if (ingredient.Name) {
        setIngredientPrefillName(ingredient.Name);
      }
      console.log(ingredient);
    },
    [
      setActionType,
      handleModalInfoEdit,
      setShowForm,
      setIngredientID,
      setIngredientCalories,
      setIngredientPrefillName,
    ]
  );
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
          <div onClick={() => handleEdit(info.row.original)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-indigo-600"
            >
              <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
            </svg>
          </div>
        ),
      }),
      columnHelper.accessor(() => null, {
        // Provide an accessor function that returns null or some id if needed
        id: "delete", // You need to provide an id for columns that don't have an accessor key
        header: () => <span>Delete</span>,
        cell: (info) => (
          <div onClick={() => handleDelete(info.row.original)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-indigo-600"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ),
      }),
    ],
    [columnHelper, handleDelete, handleEdit]
  );

  const data = useMemo(
    () =>
      apiData.filter((data) =>
        data.Name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [apiData, searchQuery]
  );

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

  const onSubmit = (values: IngredientFormValues) => {
    console.log(parseInt(values.ingredientCalories, 10));
    const payload: IngredientData[] = [
      {
        Name: values.ingredientName,
        Calories: parseInt(values.ingredientCalories, 10),
      },
    ];
    ingredientQuery.mutate(payload, {
      onSuccess: () => {
        console.log("Ingredient created successfully"),
          queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        setShowForm(false);
      },
    });
  };

  const onEdit = (values: IngredientFormValues) => {
    const payload: Partial<IngredientData> = {};
    if (values.ingredientName) payload.Name = values.ingredientName;
    if (values.ingredientCalories)
      payload.Calories = parseInt(values.ingredientCalories, 10);

    updateMutation.mutate(
      { id: ingredientID, data: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["ingredients"] });
          console.log("Item Updated!");
          setShowForm(false);
        },
      }
    );
  };

  const onChange = (value: string) => {
    setSearchQuery(value);
  };

  setTimeout(() => {
    setTest(true);
  }, 50);

  return (
    <>
      <div className="bg-white ml-1">
        <div className="max-w-7xl p-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center">
            <div className="p-4 sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Ingredients
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the ingredients to make recipes with.
              </p>
            </div>
            <div className="mt-4 ml-4 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  if (showForm) {
                    setShowForm(false);
                  } else {
                    setShowForm(true);
                    setTest(false);
                  }
                }}
              >
                {showForm ? "Show Ingredients" : "Add Ingredients"}
              </button>
            </div>
          </div>
          <div className="w-6/12">
            <SearchComponet onChange={(value) => onChange(value)} />
          </div>
        </div>
        <div className="mt-8 flow-root overflow-hidden">
          <div className="max-w-7xl  sm:px-6 lg:px-8">
            {!showForm ? (
              <Transition
                show={test}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 "
              >
                <table className="w-full text-left">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className="">
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className={` ${
                              header.column.id === "delete" ? "hidden" : ""
                            } relative isolate p-4 text-left text-sm font-semibold text-gray-900 sm:table-cell`}
                            onClick={() => console.log(header.column.id)}
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
                            className={`${
                              cell.column.id === "delete" ? `hidden` : ""
                            } p-4 text-sm text-black md:table-cell`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Transition>
            ) : (
              <IngredientForm
                onSubmit={(values) =>
                  actionType === "edit" ? onEdit(values) : onSubmit(values)
                }
                actionType={actionType}
                prefillData={{
                  name: ingredientPrefillName,
                  calories: ingredientCalories,
                }}
              />
            )}
          </div>
        </div>
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
