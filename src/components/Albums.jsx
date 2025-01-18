import React, {useState} from "react";
import Tracks from "./Tracklists";
import { useSpotify } from "../assets/dependencies/SpotifyContext";

const Albums = ({playlists}) => {

    const { playlistLoading, fetchTracks } = useSpotify()

    const [hoveredTracks, setHoveredTracks] = useState([]);
    const [hoveredPlaylistId, setHoveredPlaylistId] = useState('');

    const handleMouseEnter = async (playlistId) => {
        setHoveredPlaylistId(playlistId);
        try {
            const tracks = await fetchTracks(playlistId);
            setHoveredTracks(tracks);
        } catch (error) {
            console.error("Error fetching tracks:", error);
        }
    };

    const handleMouseLeave = () => {
        setHoveredPlaylistId(null);
        setHoveredTracks([]);
    };

    return (
        <div className="min-h-fit grid grid-cols-1 gap-4">
            <div className="flex flex-row overflow-x-auto space-x-4 scrollbar-hide">
                {playlistLoading ? (<div className="text-gray-600 text-5xl w-full h-16 montserrat-font font-extralight flex justify-center items-center">Loading Albums...</div>) : (
                    playlists.length > 0 ? (
                        playlists.map((playlist, i) => (
                            <div key={i} className="flex-none w-48 h-48 relative cursor-pointer" onMouseEnter={() => handleMouseEnter(playlist.id)} onMouseLeave={handleMouseLeave}>

                                {/* Album Image */}
                                <div className="block p-0 rounded-xl overflow-hidden">
                                    <img src={playlist.images[0].url} alt={playlist.name} className="h-full w-full object-cover rounded-xl"/>
                                </div>

                                {/* Tracks Overlay */}
                                {hoveredPlaylistId === playlist.id && <Tracks tracks={hoveredTracks} />}
                            </div>
                        ))
                    ) : (<div className="text-gray-600 text-5xl w-full montserrat-font h-16 font-extralight flex justify-center items-center">Currently Unvailable!</div>)
                )}
            </div>
        </div>
    )
};

export default Albums;