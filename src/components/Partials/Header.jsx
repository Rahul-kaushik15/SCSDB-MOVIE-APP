import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  console.log(data);
  return (
    <div
      style={{
        
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/w500${
          data.poster_path || data.profile_path
        }) `,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start  p-8"
    >
      <h1  className="text-5xl font-bold mb-3">
        {data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-4/5">{data.overview.slice(0, 150)}...<Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-500">read more</Link></p>
      <p><i className="ri-movie-2-fill "></i>  {data.media_type.toUpperCase()}</p>
      <p className="flex gap-1 mb-2"><i className="ri-calendar-fill"></i> {data.release_date || data.first_air_date}
      <i className="ri-star-fill ml-2"></i> {data.vote_average}</p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-2 bg-[#6556CD] rounded-md "><i className="ri-play-circle-fill"></i> Watch trailer</Link>
    </div>
  );
};

export default Header;
