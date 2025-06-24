import React from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
  Column,
} from "react-table";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Flex,
  Select,
  chakra,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

export interface NinjaTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  onRowClick?: (row: T) => void;
  globalFilterPlaceholder?: string;
  customFilters?: React.ReactNode;
}

export function NinjaTable<T extends object>({
  columns,
  data,
  pageSize = 10,
  onRowClick,
  globalFilterPlaceholder = "Search...",
  customFilters,
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
    <Box>
      <Flex mb={4} align="center" gap={4} flexWrap="wrap">
        <Input
          placeholder={globalFilterPlaceholder}
          value={state.globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          maxW="300px"
        />
        {customFilters}
        <Select
          value={state.pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          maxW="120px"
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </Select>
      </Flex>
      <Table
        {...getTableProps()}
        variant="striped"
        colorScheme="gray"
        size="md"
        borderRadius="md"
        overflow="hidden"
      >
        <Thead bg="gray.100">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                  cursor={column.canSort ? "pointer" : "default"}
                  _hover={column.canSort ? { bg: "gray.200" } : {}}
                >
                  {column.render("Header")}
                  {column.canSort && (
                    <chakra.span pl={2} fontSize="sm">
                      {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                    </chakra.span>
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                _hover={onRowClick ? { bg: "gray.50", cursor: "pointer" } : {}}
                onClick={
                  onRowClick ? () => onRowClick(row.original) : undefined
                }
              >
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex
        mt={4}
        justify="space-between"
        align="center"
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          Page {state.pageIndex + 1} of {pageOptions.length}
        </Box>
        <Flex gap={2}>
          <Button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            size="sm"
          >
            First
          </Button>
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            size="sm"
          >
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage} size="sm">
            Next
          </Button>
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            size="sm"
          >
            Last
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
