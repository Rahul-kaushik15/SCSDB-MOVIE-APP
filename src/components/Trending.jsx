
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Partials/Topnav";
import Dropdown from "./Partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "SCSDB | Trending Movies";


  // ✅ Fetch trending movies
  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        // append next page results
        settrending((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  // ✅ When category or duration changes, reset everything
  useEffect(() => {
    settrending([]);   // clear old results
    setpage(1);        // reset page
    sethasMore(true);  // enable infinite scroll again
  }, [category, duration]);

  // ✅ Fetch new data after reset
  useEffect(() => {
    getTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page === 1, category, duration]);

  // ✅ Infinite scroll handler
  const fetchMore = () => {
    getTrending();
  };

  return trending.length > 0 ? (
    <div className="w-full h-screen">
      <div className="w-full flex items-center p-5">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="font-extralight hover:text-[#6556CD] ri-arrow-left-line mr-3 cursor-pointer"
          ></i>
          Trending{" "}
          <small className="text-sm text-zinc-600 ml-2">
            ({category.toUpperCase()})
          </small>
        </h1>
        <div className="flex-grow ml-10 "></div>
        <Topnav />
        <Dropdown
          title="Category"
          options={["movie", "tv", "all"]}
          func={(e) => setcategory(e.target.value)}
        />
        <div className="w-4"></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setduration(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4 className="text-center text-white">Loading...</h4>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;

