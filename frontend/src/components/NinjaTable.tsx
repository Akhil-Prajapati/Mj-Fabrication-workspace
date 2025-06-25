import React from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  Column,
} from "react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export interface NinjaTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  onRowClick?: (row: T) => void;
  globalFilterPlaceholder?: string;
  customFilters?: React.ReactNode;
  themeColor?: string; // Add themeColor prop
}

export function NinjaTable<T extends object>({
  columns,
  data,
  pageSize = 10,
  onRowClick,
  globalFilterPlaceholder = "Search...",
  customFilters,
  themeColor = "#3182ce", // Default to blue
}: NinjaTableProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable<T>(
    {
      columns,
      data,
      initialState: { pageSize },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="w-full">
      <div className="flex mb-4 items-center gap-4 flex-wrap">
        <Input
          placeholder={globalFilterPlaceholder}
          value={state.globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-xs shadow-none focus:border-blue-600 focus:border-2 box"
          style={{ borderColor: themeColor, boxShadow: "none" }}
        />
        {customFilters}
        {/* <Select
          value={String(state.pageSize)}
          onValueChange={(val) => setPageSize(Number(val))}
          style={{ borderColor: themeColor }}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </Select> */}
      </div>
      <div
        className="overflow-x-auto rounded-md border"
        // style={{ borderColor: themeColor }}
      >
        <table {...getTableProps()} className="min-w-full bg-white">
          <thead style={{ background: themeColor + "22" }}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`px-4 py-2 text-left font-semibold text-gray-700 select-none ${
                      column.canSort ? "cursor-pointer hover:bg-gray-200" : ""
                    }`}
                    style={{ color: themeColor }}
                  >
                    {column.render("Header")}
                    {column.canSort && (
                      <span className="pl-2 text-xs">
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "▼"
                            : "▲"
                          : ""}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={
                    onRowClick
                      ? `hover:bg-[${themeColor}11] cursor-pointer`
                      : undefined
                  }
                  style={onRowClick ? { transition: "background 0.2s" } : {}}
                  onClick={
                    onRowClick ? () => onRowClick(row.original) : undefined
                  }
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="px-4 py-2 border-t">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex mt-4 justify-between items-center flex-wrap gap-2">
        <div>
          Page {state.pageIndex + 1} of {pageOptions.length}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            size="sm"
            style={{
              background: themeColor,
              color: "#fff",
              borderColor: themeColor,
            }}
          >
            First
          </Button>
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            size="sm"
            style={{
              background: themeColor,
              color: "#fff",
              borderColor: themeColor,
            }}
          >
            Previous
          </Button>
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            size="sm"
            style={{
              background: themeColor,
              color: "#fff",
              borderColor: themeColor,
            }}
          >
            Next
          </Button>
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            size="sm"
            style={{
              background: themeColor,
              color: "#fff",
              borderColor: themeColor,
            }}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
}
