import React from "react";
import "./App.css";
import { useFetchData } from "./app/useFetchData";
import Table from "./components/Table";

function App() {
  const { data, loading, error } = useFetchData(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User information fetched from a JSONPlaceholder API</h1>
      <Table data={data} />
    </div>
  );
}

export default App;
