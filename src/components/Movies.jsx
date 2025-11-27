
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Partials/Topnav";
import Dropdown from "./Partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Movies = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "SCSDB | Movies";

  // ✅ Fetch movies
  const getMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setmovie((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  // ✅ When category changes, reset and refetch
  useEffect(() => {
    setmovie([]); // clear old results
    setpage(1);
    sethasMore(true);
    getMovies(); // fetch new category
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // ✅ Infinite scroll handler
  const fetchMore = () => {
    getMovies();
  };

  return movie.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center p-5">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="font-extralight hover:text-[#6556CD] ri-arrow-left-line mr-3 cursor-pointer"
          ></i>
          Movies{" "}
          <small className="text-sm text-zinc-600 ml-2">
            ({category.replace("_", " ").toUpperCase()})
          </small>
        </h1>

        <div className="flex-grow ml-10"></div>
        <Topnav />
        <Dropdown
          title="Category"
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          func={(e) => setcategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4 className="text-center text-white">Loading...</h4>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
