import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import { RootState } from "../app/store";

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
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={`${index}-${header}`}>{renderCell(row[header])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
