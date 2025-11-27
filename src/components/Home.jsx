
import React, { useEffect, useState } from 'react';
import Sidenav from './Partials/Sidenav';
import Topnav from './Partials/Topnav';
import Header from './Partials/Header';
import axios from '../utils/axios';
import HorizantalCards from './Partials/HorizantalCards';
import Dropdown from './Partials/Dropdown';
import Loading from './Loading';

const Home = () => {
  document.title = "SCSDB | HomePage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState([]);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomIndex = Math.floor(Math.random() * data.results.length);
      setwallpaper(data.results[randomIndex]);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending(); // ✅ always run when category changes
  }, [category]);

  return wallpaper && trending.length > 0 ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="mb-5 p-5 flex justify-between">
          <h1 className="text-3xl text-zinc-400 uppercase font-semibold">
            Trending
          </h1>
          <Dropdown 
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizantalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
