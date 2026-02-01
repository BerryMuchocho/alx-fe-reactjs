import React from "react";
import Search from "./components/Search";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">GitHub User Search</h1>
        <Search />
      </div>
    </div>
  );
}

export default App;
