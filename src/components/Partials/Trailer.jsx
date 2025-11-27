


import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // detect movie or tv from URL
  const category = pathname.includes("movie") ? "movie" : "tv";

  // get correct category state
  const { info } = useSelector((state) => state[category]);

  // main trailer
  const trailer = info?.videos;

  if (!trailer) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 text-white z-50">
        No Trailer Found
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">

      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 text-3xl text-white hover:text-red-500"
      >
        ✕
      </button>

      {/* Trailer Modal */}
      <div className="w-[80%] h-[70%] bg-black rounded-xl overflow-hidden border border-white/20 shadow-xl">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Trailer"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Trailer;
