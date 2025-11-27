


import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Loading from './components/Loading';
import Trending from './components/Trending';
import Popular from './components/Popular';
import Movies from './components/Movies';
import Tv_Shows from './components/Tv_Shows';
import People from './components/People';
import MovieDetails from './components/MovieDetails';
import TvDetails from './components/TvDetails';
import PeopleDetails from './components/PeopleDetails';
import Trailer from './components/Partials/Trailer';


const App = () => {
  return (
    <div className='bg-[#1F1E24] w-screen h-screen text-white flex'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/loading' element={<Loading />} />  
        
        <Route path='/movies' element={<Movies />}/>
        <Route path='/movie/details/:id' element={<MovieDetails />}>
        <Route path='trailer' element={<Trailer />} />
        </Route>


   
        <Route path='/tv' element={<Tv_Shows />} />
        <Route path='tv/details/:id' element={<TvDetails />}>
          <Route path='trailer' element={<Trailer />} />
        </Route> 

        <Route path='/people' element={<People />} /> 
        <Route path='person/details/:id' element={<PeopleDetails />}/>
        
  
      </Routes>
    </div>
  );
};

export default App;
