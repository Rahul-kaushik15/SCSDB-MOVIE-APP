


import React from "react";
import { Link } from "react-router-dom";

const HorizantalCards = ({ data = [] }) => {
  return (
    <div className="w-full flex overflow-x-auto scrollbar-hide p-5 space-x-5">
      {data.map((d) => (
        <Link
          to={`/${d.media_type || "movie"}/details/${d.id}`}
          key={d.id}
          className="min-w-[200px] bg-zinc-900 rounded-lg hover:scale-105 duration-300"
        >
          <img
            className="w-full h-[200px] object-cover rounded-t-lg"
            src={
              d.poster_path || d.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${d.poster_path || d.backdrop_path}`
                : "/no-image.jpg" // fallback image
            }
            alt=""
          />

          <div className="p-3 overflow-y-auto">
            <h1 className="text-lg font-semibold mb-1">
              {d.title || d.original_name || d.original_title}
            </h1>

            <p className="text-sm text-zinc-400 ">
              {(d.overview ? d.overview.slice(0, 60) : "No description")}...
              <span className="text-blue-400 cursor-pointer"> read more</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizantalCards;
