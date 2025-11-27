// import Loader from './Loader.gif'


// const Loading = () => {
//   return (
//     <div>
//         <img src={Loader} alt="" />
//     </div>
//   )
// }

// export default Loading

import React from 'react';
import Loader from '../../public/Loader.gif';
 
const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#1F1E24]">
      <img src={Loader} alt="Loading..." className="w-32 h-32 object-contain" />
    </div>
  );
};

export default Loading;
