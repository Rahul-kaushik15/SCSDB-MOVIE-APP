

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizantalCards from "./Partials/HorizantalCards";
import { asyncloadtv, removetv } from "../store/actions/tvActions";

// ===================== WATCH PROVIDER COMPONENT =======================
const WatchProviderSection = ({ title, providers }) => {
  const list = providers || [];
  if (list.length === 0) return null;

  return (
    <div className="mt-7">
      <h1 className="text-xl font-semibold mb-3">{title}</h1>
      <div className="flex items-center gap-6">
        {list.map((p, i) => (
          <div key={i} className="flex flex-col items-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${p.logo_path}`}
              className="w-12 h-12 object-cover rounded-md"
            />
            <span className="text-xs mt-1 opacity-80">{p.provider_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===================== TV DETAILS MAIN PAGE =========================

const TvDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { info, loading } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => dispatch(removetv());
  }, [id]);

  if (loading || !info || !info.detail) return <Loading />;

  const detail = info.detail;
  const externalid = info.externalid || {};
  const wp = info.watchprovider || {};
  const trailer = info.videos;
  const bg = detail.backdrop_path || detail.poster_path;

  return (
    <div
      className="relative min-h-screen w-full px-[10%] pt-10 pb-20 text-white"
      style={{
        background: bg
          ? `linear-gradient(to bottom, rgba(0,0,0,.7), rgba(0,0,0,.95)),
             url(https://image.tmdb.org/t/p/original${bg})`
          : "#000",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* NAVIGATION */}
      <nav className="flex items-center gap-6 text-2xl mb-10">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD] transition"
        ></i>

        {detail.homepage && (
          <a target="_blank" rel="noreferrer" href={detail.homepage}>
            <i className="ri-external-link-fill hover:text-[#6556CD]"></i>
          </a>
        )}

        {externalid.wikidata_id && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.wikidata.org/wiki/${externalid.wikidata_id}`}
          >
            <i className="ri-earth-fill hover:text-[#6556CD]"></i>
          </a>
        )}

        {externalid.imdb_id && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.imdb.com/title/${externalid.imdb_id}`}
            className="flex items-center gap-2"
          >
            <i className="ri-film-fill hover:text-[#6556CD]"></i>
            IMDB
          </a>
        )}
      </nav>

      {/* TV HEADER */}
      <div className="flex gap-10 items-start">
        <img
          src={
            detail.poster_path
              ? `https://image.tmdb.org/t/p/w500${detail.poster_path}`
              : "https://via.placeholder.com/300x450"
          }
          className="h-[45vh] w-[20vw] object-cover rounded-xl shadow-xl"
        />

        <div className="max-w-[55%]">
          {/* TITLE */}
          <h1 className="text-5xl font-black leading-tight">
            {detail.name || detail.original_name}
            <span className="text-3xl font-light opacity-70">
              {" "}
              ({detail.first_air_date?.split("-")[0] || "N/A"})
            </span>
          </h1>

          {/* META INFO */}
          <div className="flex items-center gap-6 mt-6">
            <span className="bg-yellow-600 text-black font-bold text-xl w-16 h-16 rounded-full flex justify-center items-center shadow-xl">
              {(detail.vote_average * 10).toFixed()}%
            </span>

            <span className="font-semibold text-xl">User Score</span>
            <span className="opacity-80">{detail.first_air_date}</span>
            <span className="opacity-80">
              {(detail.genres || []).map((g) => g.name).join(", ")}
            </span>
            <span className="opacity-80">
              {detail.episode_run_time && detail.episode_run_time.length > 0
                ? `${detail.episode_run_time[0]} min`
                : ""}
            </span>
          </div>

          {/* TAGLINE */}
          {detail.tagline && (
            <p className="text-xl italic opacity-80 mt-6">{detail.tagline}</p>
          )}

          {/* OVERVIEW */}
          <h2 className="text-2xl font-semibold mt-8">Overview</h2>
          <p className="opacity-90 mt-2 leading-relaxed">{detail.overview}</p>

          {/* TRAILER BUTTON */}
          {trailer && trailer.length > 0 && (
            <Link
              to="trailer"
              className="inline-flex items-center gap-2 bg-[#6556CD] px-6 py-3 rounded-lg mt-8 hover:bg-blue-900 transition"
            >
              <i className="ri-play-fill text-2xl"></i> Watch Trailer
            </Link>
          )}

          {/* WATCH PROVIDERS */}
          <WatchProviderSection
            title="Available to Stream"
            providers={wp?.flatrate}
          />
          <WatchProviderSection
            title="Available to Rent"
            providers={wp?.rent}
          />
          <WatchProviderSection title="Available to Buy" providers={wp?.buy} />
        </div>
      </div>

      {/* SEASONS SECTION */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />

      <h2 className="text-5xl font-bold mt-28 mb-8 bg-gradient-to-r from-[#6556CD] to-transparent bg-clip-text text-transparent">
        Seasons
      </h2>

      <div className="relative bg-black/40 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10 hover:border-white/20 transition">
        {/* Horizontal Season Cards */}
        <div className="flex overflow-x-auto gap-6 scrollbar-none pb-4">
          {detail.seasons?.map((s, i) => (
            <div
              key={i}
              className="min-w-[180px] bg-zinc-800 backdrop-blur-lg rounded-xl p-3 shadow-lg 
                   hover:scale-105 transition cursor-pointer"
            >
              <img
                src={
                  s.poster_path
                    ? `https://image.tmdb.org/t/p/w500${s.poster_path}`
                    : "https://via.placeholder.com/200x300"
                }
                className="h-[30vh] w-full object-cover rounded-lg shadow-md hover:scale-105 transition"
              />

              <h3 className="text-lg font-semibold mt-3">{s.name}</h3>

              <p className="text-sm opacity-80 mt-1">
                Episodes: {s.episode_count || "N/A"}
              </p>

              <p className="text-xs opacity-60 mt-1">
                {s.air_date ? `Aired: ${s.air_date}` : "Air date not available"}
              </p>
            </div>
          ))}
        </div>

        {/* LEFT fade overlay */}
        <div
          className="absolute left-0 top-0 h-full w-24
               bg-gradient-to-r from-black via-black/80 to-transparent
               pointer-events-none rounded-l-xl"
        ></div>

        {/* RIGHT fade overlay */}
        <div
          className="absolute right-0 top-0 h-full w-24
               bg-gradient-to-l from-black via-black/80 to-transparent
               pointer-events-none rounded-r-xl"
        ></div>
      </div>

      {/* ======================= RECOMMENDED & SIMILAR ======================= */}
      <h2
        className="text-4xl font-bold mt-20 mb-6
         bg-gradient-to-r from-[#6556CD] to-transparent
         bg-clip-text text-transparent tracking-wide"
      >
        Recommended & Similar Titles
      </h2>

      <div className="relative w-full bg-black/40 rounded-xl p-4 shadow-xl">
        <HorizantalCards
          data={
            (info.recommendation && info.recommendation.length > 0
              ? info.recommendation
              : info.similar) || []
          }
        />

        {/* FADES */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none rounded-l-xl"></div>
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none rounded-r-xl"></div>

        <Outlet />
      </div>
    </div>
  );
};

export default TvDetails;


// TvDetails.jsx (Final Fully Fixed Code with Trailer Modal)

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
// import Loading from "./Loading";
// import HorizantalCards from "./Partials/HorizantalCards";
// import { asyncloadtv, removetv } from "../store/actions/tvActions";

// // ===================== WATCH PROVIDER COMPONENT =======================
// const WatchProviderSection = ({ title, providers }) => {
//   const list = providers || [];
//   if (list.length === 0) return null;

//   return (
//     <div className="mt-7">
//       <h1 className="text-xl font-semibold mb-3">{title}</h1>
//       <div className="flex items-center gap-6">
//         {list.map((p, i) => (
//           <div key={i} className="flex flex-col items-center">
//             <img
//               src={`https://image.tmdb.org/t/p/w500${p.logo_path}`}
//               className="w-12 h-12 object-cover rounded-md"
//             />
//             <span className="text-xs mt-1 opacity-80">{p.provider_name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ===================== MAIN TV DETAILS PAGE =======================
// const TvDetails = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   const { info, loading } = useSelector((state) => state.tv);

//   useEffect(() => {
//     dispatch(asyncloadtv(id));
//     return () => dispatch(removetv());
//   }, [id]);

//   if (loading || !info || !info.detail) return <Loading />;

//   const detail = info.detail;
//   const externalid = info.externalid || {};
//   const wp = info.watchprovider || {};
//   const trailer = info.videos;
//   const bg = detail.backdrop_path || detail.poster_path;

//   return (
//     <div
//       className="relative min-h-screen w-full px-[10%] pt-10 pb-20 text-white"
//       style={{
//         background: bg
//           ? `linear-gradient(to bottom, rgba(0,0,0,.7), rgba(0,0,0,.95)), url(https://image.tmdb.org/t/p/original${bg})`
//           : "#000",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       {/* NAVIGATION */}
//       <nav className="flex items-center gap-6 text-2xl mb-10">
//         <i
//           onClick={() => navigate(-1)}
//           className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD] transition"
//         ></i>

//         {detail.homepage && (
//           <a target="_blank" rel="noreferrer" href={detail.homepage}>
//             <i className="ri-external-link-fill hover:text-[#6556CD]"></i>
//           </a>
//         )}

//         {externalid.wikidata_id && (
//           <a
//             target="_blank"
//             rel="noreferrer"
//             href={`https://www.wikidata.org/wiki/${externalid.wikidata_id}`}
//           >
//             <i className="ri-earth-fill hover:text-[#6556CD]"></i>
//           </a>
//         )}

//         {externalid.imdb_id && (
//           <a
//             target="_blank"
//             rel="noreferrer"
//             href={`https://www.imdb.com/title/${externalid.imdb_id}`}
//             className="flex items-center gap-2"
//           >
//             <i className="ri-film-fill hover:text-[#6556CD]"></i>
//             IMDB
//           </a>
//         )}
//       </nav>

//       {/* HEADER SECTION */}
//       <div className="flex gap-10 items-start">
//         <img
//           src={
//             detail.poster_path
//               ? `https://image.tmdb.org/t/p/w500${detail.poster_path}`
//               : "https://via.placeholder.com/300x450"
//           }
//           className="h-[45vh] w-[20vw] object-cover rounded-xl shadow-xl"
//         />

//         <div className="max-w-[55%]">
//           {/* TITLE */}
//           <h1 className="text-5xl font-black leading-tight">
//             {detail.name || detail.original_name}
//             <span className="text-3xl font-light opacity-70">
//               {" "}({detail.first_air_date?.split("-")[0] || "N/A"})
//             </span>
//           </h1>

//           {/* META */}
//           <div className="flex items-center gap-6 mt-6">
//             <span className="bg-yellow-600 text-black font-bold text-xl w-16 h-16 rounded-full flex justify-center items-center shadow-xl">
//               {(detail.vote_average * 10).toFixed()}%
//             </span>

//             <span className="font-semibold text-xl">User Score</span>
//             <span className="opacity-80">{detail.first_air_date}</span>
//             <span className="opacity-80">
//               {(detail.genres || []).map((g) => g.name).join(", ")}
//             </span>
//             <span className="opacity-80">
//               {detail.episode_run_time?.length
//                 ? `${detail.episode_run_time[0]} min`
//                 : ""}
//             </span>
//           </div>

//           {/* TAGLINE */}
//           {detail.tagline && (
//             <p className="text-xl italic opacity-80 mt-6">{detail.tagline}</p>
//           )}

//           {/* OVERVIEW */}
//           <h2 className="text-2xl font-semibold mt-8">Overview</h2>
//           <p className="opacity-90 mt-2 leading-relaxed">{detail.overview}</p>

//           {/* TRAILER BUTTON */}
//           {trailer?.length > 0 && (
//             <Link
//               to="trailer"
//               className="inline-flex items-center gap-2 bg-[#6556CD] px-6 py-3 rounded-lg mt-8 hover:bg-blue-900 transition"
//             >
//               <i className="ri-play-fill text-2xl"></i> Watch Trailer
//             </Link>
//           )}

//           {/* WATCH PROVIDERS */}
//           <WatchProviderSection
//             title="Available to Stream"
//             providers={wp?.flatrate}
//           />
//           <WatchProviderSection title="Available to Rent" providers={wp?.rent} />
//           <WatchProviderSection title="Available to Buy" providers={wp?.buy} />
//         </div>
//       </div>

//       {/* SEASONS */}
//       <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />

//       <h2 className="text-5xl font-bold mt-28 mb-8 bg-gradient-to-r from-[#6556CD] to-transparent bg-clip-text text-transparent">
//         Seasons
//       </h2>

//       <div className="relative bg-black/40 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10 hover:border-white/20 transition">
//         <div className="flex overflow-x-auto gap-6 scrollbar-none pb-4">
//           {detail.seasons?.map((s, i) => (
//             <div
//               key={i}
//               className="min-w-[180px] bg-zinc-800 backdrop-blur-lg rounded-xl p-3 shadow-lg hover:scale-105 transition cursor-pointer"
//             >
//               <img
//                 src={
//                   s.poster_path
//                     ? `https://image.tmdb.org/t/p/w500${s.poster_path}`
//                     : "https://via.placeholder.com/200x300"
//                 }
//                 className="h-[30vh] w-full object-cover rounded-lg shadow-md hover:scale-105 transition"
//               />

//               <h3 className="text-lg font-semibold mt-3">{s.name}</h3>
//               <p className="text-sm opacity-80 mt-1">Episodes: {s.episode_count}</p>
//               <p className="text-xs opacity-60 mt-1">
//                 {s.air_date ? `Aired: ${s.air_date}` : "Air date not available"}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* FADES */}
//         <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none rounded-l-xl"></div>
//         <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none rounded-r-xl"></div>
//       </div>

//       {/* RECOMMENDED */}
//       <h2 className="text-4xl font-bold mt-20 mb-6 bg-gradient-to-r from-[#6556CD] to-transparent bg-clip-text text-transparent">
//         Recommended & Similar Titles
//       </h2>

//       <div className="relative w-full bg-black/40 rounded-xl p-4 shadow-xl">
//         <HorizantalCards
//           data={
//             info.recommendation?.length > 0
//               ? info.recommendation
//               : info.similar || []
//           }
//         />

//         <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none rounded-l-xl"></div>
//         <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none rounded-r-xl"></div>

//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default TvDetails;
