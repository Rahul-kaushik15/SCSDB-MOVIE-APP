import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Partials/Topnav";
import Dropdown from "./Partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "SCSDB | Popular Movies";


  // ✅ Fetch popular movies
  const getPopular = async () => {
    try {
      const { data } = await axios.get(`/movie/popular?page=${page}`
      );

      if (data.results.length > 0) {
        document.title = "SCSDB | Popular Movies";
        // append next page results
        setpopular((prev) => [...prev, ...data.results]);
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
    setpopular([]);   // clear old results
    setpage(1);        // reset page
    sethasMore(true);  // enable infinite scroll again
  }, [category]);

  // ✅ Fetch new data after reset
  useEffect(() => {
    getPopular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page === 1, category]);

  // ✅ Infinite scroll handler
  const fetchMore = () => {
    getPopular();
  };

  return popular.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center p-5">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="font-extralight hover:text-[#6556CD] ri-arrow-left-line mr-3 cursor-pointer"
          ></i>
          Popular {" "}
           <small className="text-sm text-zinc-600 ml-2">
            ({category.toUpperCase()})
          </small>
        </h1>
        <div className="flex-grow ml-10 "></div>
        <Topnav />
        <Dropdown
          title="Category"
          options={["movie", "tv",]}
          func={(e) => setcategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4 className="text-center text-white">Loading...</h4>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;


// const { data } = await axios.get(`/movie/${category}?page=${page}`);