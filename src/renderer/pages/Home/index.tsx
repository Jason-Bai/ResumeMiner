import React from "react";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-8 text-4xl font-bold text-gray-800">ResumeMiner</h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Home;
