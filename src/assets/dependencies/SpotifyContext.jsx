import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const SpotifyContext = createContext();

export const useSpotify = () => {
    return useContext(SpotifyContext);
};

export const SpotifyProvider = ({ children }) => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    // console.log(clientId, clientSecret, redirectUri)

    const [authToken, setAuthToken] = useState(null);
    const [token, setToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token') || null);
    const [user, setUser] = useState(null);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [defaultPlaylists, setDefaultPlaylists] = useState([]);
    const [error, setError] = useState(null);
    const [spotifyLogin, setSpotifyLogin] = useState(JSON.parse(localStorage.getItem('spotifylogin')) || false)
    const [waveFormLogin, setWaveFormLogin] = useState(JSON.parse(localStorage.getItem('waveformlogin')) || false)
    const [trackLoading, setTrackLoading] = useState(false)
    const [genre, setGenre] = useState({ type: "", list: [] });
    const [playlistLoading, setPlaylistLoading] = useState(true);
    const [tokenExpiryTime, setTokenExpiryTime] = useState(null);

    const redirectToAuth = () => {
        const scope = [
            "playlist-read-private",
            "playlist-read-collaborative",
            "playlist-modify-private",
            "playlist-modify-public",
            "user-library-modify",
            "user-library-read",
            "ugc-image-upload",
            "user-read-playback-position",
            "user-top-read",
            "user-read-recently-played",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "app-remote-control",
            "streaming"
        ]
        const authUrl = new URL("https://accounts.spotify.com/authorize");
        authUrl.searchParams.append("response_type", "code");
        authUrl.searchParams.append("client_id", clientId);
        authUrl.searchParams.append("redirect_uri", redirectUri);
        authUrl.searchParams.append("scope", scope.join(" "));
        window.location.href = authUrl.toString();
    };

    const fetchAuthToken = async (code) => {
        try {
            const response = await axios.post("https://accounts.spotify.com/api/token",
                new URLSearchParams ({
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: redirectUri,
                }), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                    },
                }
            );
            setAuthToken(response.data.access_token);
            setRefreshToken(response.data.refresh_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            setTokenExpiryTime(Date.now() + response.data.expires_in * 1000);
            console.log('fetching auth token', response.data.access_token, response.data.refresh_token)
        } catch (error) {
            setError("Failed to fetch token");
            console.error("Error fetching auth token:", error);
            throw error
        }
    };

    const fetchClientToken = async () => {
        try {
            const response = await axios.post("https://accounts.spotify.com/api/token", "grant_type=client_credentials", {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
                        },
                    }
                );
            setToken(response.data.access_token);
            console.log('fetching client token')
        } catch (error) {
            setError('Failed to fetch token')
            console.error("Error fetching client token:", error);
            throw error;
        }
    };
    
    const refreshAccessToken = async () => {
        if (!refreshToken) return;
        
        try {
            const response = await axios.post("https://accounts.spotify.com/api/token", new URLSearchParams({
                    grant_type: "refresh_token",
                    refresh_token: refreshToken,
                }), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                    },
                }
            );
            setAuthToken(response.data.access_token);
            setTokenExpiryTime(Date.now() + response.data.expires_in * 1000);
            console.log('refreshing token')
        } catch (error) {
            setError("Failed to refresh token");
            console.error("Error refreshing auth token:", error);
            throw error
        }
    };

    const fetchUser = async () => {
        if (!authToken) return;
        
        try {
            const response = await axios.get("https://api.spotify.com/v1/me", {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            setUser(response.data);
            console.log('fetching user data', response.data)
        } catch (error) {
            setError('Failed to fetch user data')
            console.error("Error fetching user data:", error);
            throw error
        }
    };
    
    const fetchGenres = async () => {
        try {
            const response = await axios.get("https://api.spotify.com/v1/browse/categories?locale=en_IN", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const genres = response.data.categories.items;
                setGenre({
                    type: genre.type,
                list: genres,
            });
            console.log('fetching genres', genres)
        } catch (error) {
            setError('Failed to fetch genres')
            console.error("Error fetching genres:", error);
            throw error;
        }
    };

    const fetchUserPlaylists = async () => {
        if (!authToken) return;
        
        try {
            setPlaylistLoading(true)
            const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            setUserPlaylists(response.data.items);
            console.log('fetching user playlist', response.data.items)
        } catch (error) {
            setError('Failed to fetch playlists')
            console.error("Error fetching user playlists:", error);
            throw error
        } finally {
            setPlaylistLoading(false)
        }
    };

    const fetchDefaultPlaylists = async (genreId) => {
        try {
            setPlaylistLoading(true)
            const response = await axios.get(`https://api.spotify.com/v1/browse/categories/${genreId.length ? genreId : '0JQ5DAqbMKFHCxg5H5PtqW'}/playlists`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            setDefaultPlaylists(response.data.playlists.items);
            console.log('fetching default playlist', response.data.playlists.items)
        } catch (error) {
            setError('Failed to fetch playlists')
            console.error("Error fetching default playlists:", error);
            throw error;
        } finally {
            setPlaylistLoading(false)
        }
    };
    
    const fetchTracks = async (playlistId) => {
        try {
            setTrackLoading(true)
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: { Authorization: `Bearer ${spotifyLogin === true ? authToken : token}` },
                });
            console.log('fetching tracks')
            return response.data.items;
        } catch (error) {
            setError('Failed to fetch tracklist')
            console.error("Error fetching tracklist:", error);
            throw error;
        } finally {
            setTrackLoading(false)
        }
    };

    const fetchAtists = async () => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/artists/6eUKZXaKkcviH0Ku9w2n3V/albums?limit=50`, {
                headers: { Authorization: `Bearer ${authToken}` },
                });
            console.log('fetching artists', response.data)
        } catch(error) {
            setError('failed to fetch artists')
            console.error('Error fetching artists:', error)
            throw error
        }
    }
    
    useEffect(() => {
        console.log('refresh phase', authToken, tokenExpiryTime)
        if (authToken && tokenExpiryTime) {
            const timeToExpiry = tokenExpiryTime - Date.now();
            const timeoutId = setTimeout(() => {
                refreshAccessToken();
            }, timeToExpiry - 60000);

            return () => clearTimeout(timeoutId);
        }
    }, [authToken, tokenExpiryTime]);

    useEffect(() => {
        console.log('auth out')
        const code = new URLSearchParams(window.location.search).get("code");
        if (code && !authToken) {
            console.log('auth in')
            fetchAuthToken(code)
            window.history.replaceState(null, "", window.location.pathname);
        }
    }, []);

    useEffect(() => {
        console.log('client out')
        if(!token && waveFormLogin) {
            console.log('client in')
            fetchClientToken()
        }
    }, [waveFormLogin])

    useEffect(() => {
        if(spotifyLogin && waveFormLogin && refreshToken) {
            refreshAccessToken()
        }
    }, [spotifyLogin, waveFormLogin, refreshToken])

    useEffect(() => {
        console.log('client utils out')
        if(token) {
            console.log('client utils in')
            fetchGenres()
            fetchDefaultPlaylists(genre.type)
        }
    }, [token])

    useEffect(() => {
        console.log('def playlist change')
        if(!token) return
        console.log('def palylist change in')
        fetchDefaultPlaylists(genre.type)
    }, [genre.type])

    useEffect(() => {
        console.log('auth utils out', authToken)
        if (authToken) {
            console.log('auth utils in')
            fetchUser();
            fetchUserPlaylists();
            fetchAtists()
        }
    }, [authToken]);

    return (
        <SpotifyContext.Provider value={{authToken, user, genre, userPlaylists, defaultPlaylists, trackLoading, playlistLoading, spotifyLogin, waveFormLogin, error, redirectToAuth, setSpotifyLogin, setWaveFormLogin, setGenre, fetchTracks}}>
            {children}
        </SpotifyContext.Provider>
    );
};