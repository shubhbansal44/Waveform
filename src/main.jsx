import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Info from './pages/Info.jsx'
import Playlists from './pages/Playlists.jsx'
import Favourites from './pages/Favourites.jsx'
import Library from './pages/Library.jsx'
import Artists from './pages/Artists.jsx'
import Artist from './pages/Artist.jsx'
import Album from './pages/Album.jsx'
import Settings from './pages/Settings.jsx'
import ErrorPage from './pages/Error.jsx'
import Authentication from './pages/Authentication.jsx'
import { SpotifyProvider } from './assets/dependencies/SpotifyContext.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="authentication" element={<Authentication />} errorElement={<ErrorPage />} />

            <Route path="/" element={<App />} errorElement={<ErrorPage />}>
                <Route path="home" element={<Home />} />
                <Route path="playlists" element={<Playlists />} />
                <Route path="playlists/:album" element={<Album />} />
                <Route path="favourites" element={<Favourites />} />
                <Route path="library" element={<Library />} />
                <Route path="artists" element={<Artists />} />
                <Route path="artists/:artist" element={<Artist />} />
                <Route path="settings" element={<Settings />} />
                <Route path="info" element={<Info />} />
            </Route>
        </>
    )
);

createRoot(document.getElementById('root')).render(
    <SpotifyProvider>
        <RouterProvider router={router} />
    </SpotifyProvider>
)