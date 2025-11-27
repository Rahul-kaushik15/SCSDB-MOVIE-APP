

import { Link } from "react-router-dom";

const Sidenav = () => {
  
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-700 p-10 bg-zinc-900">
      {/* Logo */}
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span>SCSDB.</span>
      </h1>

      {/* Navigation Section */}
      <nav className="flex flex-col gap-2 text-zinc-400 text-lg">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>

        <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300">
          <i className="ri-fire-fill mr-2"></i> Trending
        </Link>

        <Link to="/popular" className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300">
          <i className="ri-bard-fill mr-2"></i> Popular
        </Link>

        <Link to="/movies" className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300">
          <i className="ri-movie-2-fill mr-2"></i> Movies
        </Link>

        <Link to="/tv" className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300">
          <i className="ri-tv-2-fill mr-2"></i> TV Shows
        </Link>

        <Link to="/people" className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300">
          <i className="ri-team-fill mr-2"></i> People
        </Link>
      </nav>

      <hr className="mt-5 border-none h-[1px] bg-zinc-600" />

      {/* Info Section */}
      <nav className="flex flex-col gap-2 text-zinc-400 text-lg">
        <h1 className="text-white font-semibold text-xl mt-7 mb-5">
          Website Information
        </h1>

        <Link to="/about" className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300">
          <i className="ri-information-fill mr-2"></i> About
        </Link>

        <Link to="/contact" className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300">
          <i className="ri-phone-line mr-2"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
