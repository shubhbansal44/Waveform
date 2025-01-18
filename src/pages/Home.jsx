import React, { useEffect } from "react";
import Heading from "../components/Heading";
import Albums from "../components/Albums";
import { useSpotify } from "../assets/dependencies/SpotifyContext";

const Home = () => {

    const {setWaveFormLogin, defaultPlaylists, userPlaylists} = useSpotify()

    useEffect(() => {
        if(localStorage.getItem('waveformlogin')) {
            setWaveFormLogin(true)
        }
    }, [])

    return (
        <main className="overflow-y-auto space-y-7 z-0">

            {/* Featured Albums */}
            <div className="space-y-4">
                <Heading heading={"featured albums"} flag icon={'bx bx-album'} />
                <Albums playlists={defaultPlaylists} />
            </div>

            {/* Featured Artists */}
            <div className="space-y-3">
                <Heading heading={'user albums'} icon={'bx bx-album'}/>
                <Albums playlists={userPlaylists} />
            </div>

        </main>
    );
};

export default Home;