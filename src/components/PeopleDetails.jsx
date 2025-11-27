


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { asyncloadpeople, removepeople } from "../store/actions/personActions"; 

import { motion } from "framer-motion";

import Loading from "./Loading";
import HorizantalCards from "./Partials/HorizantalCards";

const PeopleDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [readMore, setReadMore] = useState(false);
  const [category, setCategory] = useState("all");

  const { info, loading } = useSelector((state) => state.people);

  useEffect(() => {
    dispatch(asyncloadpeople(id));
    return () => dispatch(removepeople());
  }, [id]);

  if (loading || !info || !info.detail) return <Loading />;

  const detail = info.detail;
  const external = info.externalid || {};
  const biography = detail.biography || "No biography available.";
  const aka = detail.also_known_as?.length ? detail.also_known_as.join(", ") : "N/A";

  const bg =
    detail.profile_path ||
    detail.backdrop_path ||
    detail.poster_path ||
    null;

  // SAFE SORT (NO MUTATION)
  const sortedActing = [...(info.combinedCredits?.cast || [])]
    .filter((i) => {
      if (category === "movie") return i.media_type === "movie";
      if (category === "tv") return i.media_type === "tv";
      return true;
    })
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

  return (
    <div
      className="relative w-full min-h-screen px-[10%] pt-10 pb-20 text-white"
      style={{
        backgroundImage: bg
          ? `url(https://image.tmdb.org/t/p/original${bg})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* DARK OVERLAY */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.75), rgba(0,0,0,.95))"
        }}
      />

      <div className="relative z-10">
        {/* BACK BUTTON */}
        <nav className="flex items-center gap-6 text-2xl mb-10">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD] transition"
          />
        </nav>

        {/* HEADER */}
        <div className="flex gap-10 items-start">
          <motion.img
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src={
              detail.profile_path
                ? `https://image.tmdb.org/t/p/w500${detail.profile_path}`
                : "https://via.placeholder.com/300x450"
            }
            className="h-[45vh] w-[20vw] object-cover rounded-xl shadow-xl"
          />

          <div className="max-w-[55%]">
            <h1 className="text-5xl font-black leading-tight">
              {detail.name}
            </h1>

            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-5 mt-3 text-3xl">
              {external.instagram_id && (
                <a
                  target="_blank"
                  href={`https://instagram.com/${external.instagram_id}`}
                  className="hover:text-pink-500"
                >
                  <i className="ri-instagram-fill" />
                </a>
              )}
              {external.twitter_id && (
                <a
                  target="_blank"
                  href={`https://twitter.com/${external.twitter_id}`}
                  className="hover:text-blue-400"
                >
                  <i className="ri-twitter-x-fill" />
                </a>
              )}
              {external.facebook_id && (
                <a
                  target="_blank"
                  href={`https://facebook.com/${external.facebook_id}`}
                  className="hover:text-blue-600"
                >
                  <i className="ri-facebook-circle-fill" />
                </a>
              )}
              {external.wikidata_id && (
                <a
                  target="_blank"
                  href={`https://www.wikidata.org/wiki/${external.wikidata_id}`}
                  className="hover:text-green-400"
                >
                  <i className="ri-global-line" />
                </a>
              )}
            </div>

            {/* PERSONAL INFO SECTION */}
            <h2 className="text-2xl font-semibold mt-8">Personal Information</h2>

            <div className="mt-4 text-lg opacity-90 space-y-2">
              <p><b>Known For:</b> {detail.known_for_department || "N/A"}</p>
              <p><b>Gender:</b> {detail.gender === 1 ? "Female" : "Male"}</p>
              <p><b>Birthday:</b> {detail.birthday || "N/A"}</p>
              <p><b>Place of Birth:</b> {detail.place_of_birth || "Unknown"}</p>
              <p><b>Also Known As:</b> {aka}</p>
              <p><b>Popularity:</b> {detail.popularity?.toFixed(2)}</p>
            </div>

            {/* BIOGRAPHY */}
            <h2 className="text-2xl font-semibold mt-8">Biography</h2>

            <p className="opacity-90 mt-2 leading-relaxed">
              {readMore ? biography : biography.slice(0, 300) + "..."}
            </p>

            {biography.length > 300 && (
              <button
                className="text-[#6556CD] font-semibold mt-2"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Read Less ▲" : "Read More ▼"}
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY DROPDOWN */}
        <div className="flex justify-between items-center mt-20 mb-6">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#857fa9] to-transparent bg-clip-text text-transparent tracking-wide">
            Acting Career
          </h2>

          <select
            onChange={(e) => setCategory(e.target.value)}
            className="bg-black/60 px-4 py-2 rounded-lg border border-white/20 outline-none"
          >
            <option value="all">All</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
        </div>

        {/* ACTING CARDS */}
        <div className="relative w-full bg-black/40 rounded-xl p-4 shadow-xl">
          <HorizantalCards data={sortedActing} />

          {/* Fade Edges */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none rounded-l-xl" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none rounded-r-xl" />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PeopleDetails;
