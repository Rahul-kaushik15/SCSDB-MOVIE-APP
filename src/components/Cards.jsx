

import React from "react";
import { Link } from "react-router-dom";


const Cards = ({ data , title}) => {
    console.log(title)
  return (
    <div className=" relative flex flex-wrap gap-5 p-5 justify-center bg-zinc-800">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} key={i} className="w-[180px]">
          <img
            src={
              c.poster_path || c.profile_path
                ? `https://image.tmdb.org/t/p/w500${c.poster_path || c.profile_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={c.title || c.original_name || c.original_title}
            className="w-full h-[250px] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
          />
          <h2 className="text-center mt-2 text-sm font-semibold text-zinc-300">
            {c.title || c.original_name || c.original_title}
          </h2>

          {c.vote_average && (
              <div className="flex flex-col justify-center items-center text-yellow-600 font-semibold  ">{(c.vote_average * 10).toFixed(0)}%</div>

          )}

        </Link>
      ))}
    </div>
  );
};

export default Cards;
