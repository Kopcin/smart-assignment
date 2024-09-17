import React, { useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  styled,
} from "@mui/material";

interface TableProps {
  data: Array<{ [key: string]: any }>;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.primary,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.background.default,
  },
}));

const Table = ({ data }: TableProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  const handleRequestSort = (property: string) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const getComparator = (order: "asc" | "desc", orderBy: string) => {
    return (a: any, b: any) => {
      if (orderBy === "") return 0;
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    };
  };

  if (data.length === 0) {
    return <div>No data to display.</div>;
  }

  const sortedData = data.slice().sort(getComparator(order, orderBy));
  const headers = Object.keys(data[0]);

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <StyledTableCell
                key={header}
                sortDirection={orderBy === header ? order : false}
              >
                <TableSortLabel
                  active={orderBy === header}
                  direction={orderBy === header ? order : "asc"}
                  onClick={() => handleRequestSort(header)}
                >
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </TableSortLabel>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, index) => (
            <StyledTableRow key={index}>
              {headers.map((header) => (
                <TableCell key={`${index}-${header}`}>
                  {typeof row[header] === "object" && row[header] !== null
                    ? Object.values(row[header]).join(", ")
                    : row[header] !== undefined
                    ? row[header]
                    : "N/A"}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
