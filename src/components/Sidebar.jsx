import React, { useState } from "react";
import Endpoint from "./Endpoints";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <aside className="p-4 z-[1]">
        <div className={`h-full ${isExpanded ? "w-72" : "w-fit"} bg-black/10 p-3 flex flex-col justify-between rounded-xl transition-all duration-500`}>
            <div className="flex flex-col space-y-3 w-full items-center">
                <div className="flex flex-row hover:bg-white/5 rounded-lg p-3 space-x-2 w-full">
                    <button onClick={() => setIsExpanded(!isExpanded)}><i className={`bx ${isExpanded ? 'bx-chevrons-left' : 'bx-menu-alt-left'} text-gray-600 text-4xl`}></i></button>
                    <input type="text" className={`${isExpanded ? 'border border-teal-900 bg-transparent focus:border-teal-500 focus:outline-none rounded-xl p-2 pl-2 placeholder:text-sm' : 'hidden'}`} autoComplete="off" placeholder="Search Song, Album, Artist..."/>
                </div>
                <Endpoint label={'home'} icon={'bx-home-alt-2'} isExpanded={isExpanded} endpoint={'home'}/>
                <Endpoint label={'playlists'} icon={'bxs-music'} isExpanded={isExpanded} endpoint={'playlists'}/>
                <Endpoint label={'favourites'} icon={'bx-heart'} isExpanded={isExpanded} endpoint={'favourites'}/>
                <Endpoint label={'library'} icon={'bx-library'} isExpanded={isExpanded} endpoint={'library'}/>
                <Endpoint label={'artists'} icon={'bxs-playlist'} isExpanded={isExpanded} endpoint={'artists'}/>
            </div>
            <div className="w-full items-center">
                <div className="flex flex-col space-y-3 ">
                    <Endpoint label={'settings'} icon={'bx-cog'} isExpanded={isExpanded} endpoint={'settings'}/>
                    <Endpoint label={'info'} icon={'bx-info-circle'} isExpanded={isExpanded} endpoint={'info'}/>
                </div>
                <p className={`${isExpanded ? 'text-[.77rem] poppins-regular text-gray-500 h-fit mt-2' : 'hidden'}`}>© 2024 ASH-Waveform. All rights reserved.</p>
            </div>
        </div>
    </aside>
  )
}

export default Sidebar