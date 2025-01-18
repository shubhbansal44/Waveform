import React from "react";
import { useSpotify } from "../assets/dependencies/SpotifyContext";

const Tracks = ({tracks}) => {

    const { trackLoading } = useSpotify()

    return (
        <div className="absolute inset-0 flex flex-col overflow-y-auto scrollbar-hide text-xs p-3 space-y-3 text-gray-300 poppins-light bg-black/75 rounded-xl"> {
                trackLoading ? (<span className="text-gray-400">Loading tracks...</span>) : (
                    tracks.length > 0 ? (tracks.map((disc, j) => (
                        <button key={j} className="text-start">
                            <span className="hover:text-gray-100">
                                {disc.track.name}
                            </span>
                        </button>
                ))) : (<span className="text-gray-400">No tracks available</span>)
                )
            }
        </div>
    )
};

export default Tracks;