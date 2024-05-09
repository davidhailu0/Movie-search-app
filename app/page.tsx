"use client";
import { ChangeEvent, useState, useEffect } from "react";
import Card, { Props } from "@/component/card";

export default function Home() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    handleClick();
  }, [page]);
  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    fetch(process.env.NEXT_PUBLIC_URL + `&query=${query}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        "Content-Type": "application/json",
      },
    }).then(async (movies: any) => {
      const data = await movies.json();
      setSearchResult(data["results"]);
      setTotalPages(data["total_pages"]);
    });
  };

  const handleClick = () => {
    fetch(process.env.NEXT_PUBLIC_URL + `&query=${query}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        "Content-Type": "application/json",
      },
    }).then(async (movies: any) => {
      const data = await movies.json();
      setSearchResult(data["results"]);
      setTotalPages(data["total_pages"]);
    });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-center">
        <input
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-gray-400"
          type="text"
          placeholder="Search Movie"
          value={query}
          name="query"
          onChange={handleQueryChange}
        />
        <button
          type="submit"
          className="ml-5 px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          onClick={handleClick}
        >
          <svg
            className="mr-2 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </button>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
        {searchResult.map((props) => (
          <Card
            key={props["id"]}
            id={props["id"]}
            title={props["original_title"]}
            releaseDate={props["release_date"]}
            posterImage={props["poster_path"]}
            averageRating={props["vote_average"]}
          />
        ))}
      </div>
      <div className="flex justify-between w-full">
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={page === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        {
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={page === totalPages}
            onClick={handleNext}
          >
            Next
          </button>
        }
      </div>
    </main>
  );
}
