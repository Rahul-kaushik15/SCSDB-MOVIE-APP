
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Partials/Topnav";
import axios from "../utils/axios";
import Cards from "./Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "SCSDB | People";

  // ✅ Fetch get people
  const getPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setperson((prev) => [...prev, ...data.results]);
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
    setperson([]);
    setpage(1);
    sethasMore(true);
    getPerson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // ✅ Infinite scroll handler
  const fetchMore = () => {
    getPerson();
  };

  return person.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center p-5">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="font-extralight hover:text-[#6556CD] ri-arrow-left-line mr-3 cursor-pointer"
          ></i>
          Person{" "}
          <small className="text-sm text-zinc-600 ml-2">
            ({category.replace("_", " ").toUpperCase()})
          </small>
        </h1>

        <div className="flex-grow ml-10"></div>
        <Topnav />
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4 className="text-center text-white">Loading...</h4>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;

