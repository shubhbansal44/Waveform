import React from "react";
import { useSpotify } from "../assets/dependencies/SpotifyContext";

const Navbar = () => {
    const {setWaveFormLogin, spotifyLogin, setSpotifyLogin} = useSpotify()

    const log = (btn) => {
        btn.preventDefault()
        setWaveFormLogin(false)
        localStorage.removeItem('waveformlogin')
        setSpotifyLogin(false)
        localStorage.removeItem('spotifylogin')
    }

    return (
        <nav className="text-gray-600 text-5xl flex items-center justify-between py-4 montserrat-font z-[1] w-full gap-4">
            <button onClick={(e) => log(e)} className=" flex text-xl pl-0"><i className={`bx ${spotifyLogin ? 'bx-log-out' : 'bx-log-in'} self-center pr-1`}></i>Log{spotifyLogin ? 'out' : 'in'}</button>
            <span className="mr-4">Waveform</span>
        </nav>
    )
}

export default Navbar