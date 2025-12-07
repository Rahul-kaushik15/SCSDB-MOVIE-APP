

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Partials/Topnav";
import Dropdown from "./Partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Tv_Shows = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "SCSDB | TV Shows";

  // ✅ Fetch TV Shows
  const getTv_Shows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settv((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error fetching TV shows:", error);
    }
  };

  // ✅ Reset when category changes
  useEffect(() => {
    settv([]);
    setpage(1);
    sethasMore(true);
    getTv_Shows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // ✅ Infinite scroll handler
  const fetchMore = () => {
    getTv_Shows();
  };

  return tv.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center p-5">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="font-extralight hover:text-[#6556CD] ri-arrow-left-line mr-3 cursor-pointer"
          ></i>
          TV Shows{" "}
          <small className="text-sm text-zinc-600 ml-2">
            ({category.replace("_", " ").toUpperCase()})
          </small>
        </h1>

        <div className="flex-grow ml-10"></div>
        <Topnav />
        <Dropdown
          title="Category"
          // ✅ Correct API values
          options={[
            { label: "Airing Today", value: "airing_today" },
            { label: "On The Air", value: "on_the_air" },
            { label: "Popular", value: "popular" },
            { label: "Top Rated", value: "top_rated" },
          ]}
          func={(e) => setcategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4 className="text-center text-white">Loading...</h4>}
      >
        <Cards data={tv} title="Tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tv_Shows;

