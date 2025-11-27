import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    if (query.trim().length > 0) {
      GetSearch();
    } else {
      setSearches([]);
    }
  }, [query]);

  return (
    <div className="z-[100] w-full h-[10vh] relative flex justify-center items-center">
      {/* Search Icon */}
      <i className="text-2xl text-zinc-400 mr-3 ri-search-line"></i>

      {/* Input Field */}
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] bg-zinc-800 rounded-lg px-3 py-1 outline-none border-none text-zinc-200"
        type="text"
        placeholder="Search movies, shows, or people..."
      />

      {/* Clear Input Icon */}
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-2xl text-zinc-400 ml-3 cursor-pointer ri-close-line"
        ></i>
      )}

      {/* Search Results */}
      {query && searches?.length > 0 && (
        <div className="w-[50%] max-h-[50vh] bg-zinc-200 absolute top-[99.9%] rounded-lg overflow-auto shadow-lg text-black">
          {searches.slice(0, 7).map((s, i) => (
            <Link
              key={i}
              to={`/${s.media_type}/details/${s.id}`}
              className="w-full p-4 flex items-center justify-start border-b border-zinc-300 hover:bg-zinc-300 duration-300"
            >
              <img
                src={
                  s.poster_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/w92${
                        s.poster_path || s.profile_path
                      }`
                    : "https://via.placeholder.com/40"
                }
                alt={s.title || s.name}
                className="w-10 h-10 object-cover rounded-full mr-4"
              />
              <span>{s.title || s.name}</span>
            </Link>
          ))}
        </div>
      )}

      {/* No results message */}
      {query && searches?.length === 0 && (
        <div className="w-[50%] bg-zinc-200 absolute top-[90%] rounded-lg p-4 text-center text-black shadow-lg">
          No results found.
        </div>
      )}
    </div>
  );
};

export default Topnav;
