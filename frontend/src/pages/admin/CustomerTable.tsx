import React from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button as ChakraButton,
} from "@chakra-ui/react";
import { useTable } from "react-table";
import { Customer } from "./CustomerManagement";

interface CustomerTableProps {
  customers: Customer[];
}

export const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  const [selectedCustomer, setSelectedCustomer] =
    React.useState<Customer | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const data = React.useMemo(() => customers, [customers]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }: any) => (
          <span
            style={{
              color: "#3182ce",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => {
              setSelectedCustomer(row.original);
              onOpen();
            }}
          >
            {row.original.name}
          </span>
        ),
      },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "GST Number", accessor: "gstNumber" },
      { Header: "Type", accessor: "type" },
      { Header: "State Code", accessor: "stateCode" },
      { Header: "Created At", accessor: "createdAt" },
    ],
    [onOpen]
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <table
        {...getTableProps()}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "2px solid #e2e8f0",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      borderBottom: "1px solid #e2e8f0",
                      padding: "8px",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customer Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCustomer && (
              <div>
                <p>
                  <strong>Name:</strong> {selectedCustomer.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedCustomer.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedCustomer.phone}
                </p>
                <p>
                  <strong>GST Number:</strong> {selectedCustomer.gstNumber}
                </p>
                <p>
                  <strong>Type:</strong> {selectedCustomer.type}
                </p>
                <p>
                  <strong>State Code:</strong> {selectedCustomer.stateCode}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedCustomer.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Address:</strong> {selectedCustomer.address}
                </p>
                {selectedCustomer.addresses &&
                  selectedCustomer.addresses.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                      <strong>Addresses:</strong>
                      <ul style={{ marginLeft: 16 }}>
                        {selectedCustomer.addresses.map((addr, idx) => (
                          <li key={idx} style={{ marginBottom: 8 }}>
                            <div>
                              <strong>Type:</strong> {addr.addressType}
                            </div>
                            <div>
                              <strong>Line 1:</strong> {addr.addressLine1}
                            </div>
                            {addr.addressLine2 && (
                              <div>
                                <strong>Line 2:</strong> {addr.addressLine2}
                              </div>
                            )}
                            <div>
                              <strong>City:</strong> {addr.city}
                            </div>
                            <div>
                              <strong>State:</strong> {addr.state}
                            </div>
                            <div>
                              <strong>Pincode:</strong> {addr.pincode}
                            </div>
                            <div>
                              <strong>Default:</strong>{" "}
                              {addr.isDefault ? "Yes" : "No"}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <ChakraButton onClick={onClose}>Close</ChakraButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
