import React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";

interface TableProps {
  data: Array<{ [key: string]: any }>;
}

const Table = ({ data }: TableProps) => {
  if (data.length === 0) {
    return <div>No data to display.</div>;
  }

  const headers = Object.keys(data[0]);

  const renderCell = (value: any) => {
    if (typeof value === "object" && value !== null) {
      return Object.values(value).join(", ");
    }
    return value !== undefined ? value : "N/A";
  };

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>
                <TableSortLabel>{header}</TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow 
            key={index}
            sx={{ 
                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              {headers.map((header) => (
                <TableCell key={`${index}-${header}`}>
                  {renderCell(row[header])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
