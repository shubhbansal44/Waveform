import React from "react";
import { useSpotify } from "../assets/dependencies/SpotifyContext";

const Heading = ({heading, flag, icon}) => {

    const { genre, setGenre } = useSpotify()

    const genreChange = (category) => {
        setGenre({
            type: category.target.value,
            list: genre.list,
        });
    };

    return (
        <div className="flex flex-row items-center justify-between pr-6">
            <div className="flex flex-row space-x-4">
                <button aria-label="Open Featured Albums">
                    <i className={`${icon} text-gray-600 text-4xl`}></i>
                </button>
                <p className="text-3xl montserrat-font text-gray-500 uppercase flex text-center items-center justify-center">{heading}</p>
            </div> {
            flag ? (
            <div className="flex flex-row space-x-2">
                <select name="genre" id="genre" className="p-1 text-2xl w-52 bg-white/5 rounded-lg text-gray-600 poppins-regular font-light capitalize outline-none" onChange={genreChange}>
                    <option key={0} value="" className="text-xs">Select genre...</option>
                    {genre.list.map((genre, i) => (<option key={i + 1} value={genre.id} name={genre.name} className="text-xs">{genre.name}</option>))}
                </select>
            </div>) : (<></>)
            } 
        </div>
    )
}

export default Heading;