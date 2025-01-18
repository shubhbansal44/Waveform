import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useSpotify } from '../assets/dependencies/SpotifyContext';
import { Link, useNavigate } from 'react-router-dom';

function Authentication() {

    const IdRef = useRef(null)
    const [Id, setId] = useState('')
    const navigate = useNavigate()
    const {spotifyLogin, setSpotifyLogin, waveFormLogin, setWaveFormLogin, redirectToAuth} = useSpotify()

    const IdGenerator = useCallback(() => {
        let pass = ''
        let ground = "a7c%xk9f@v&l!m=hi*o~d?r$g+u<w5b2z|t3y8j6pq#n>"
    
        for (let i = 0; i < 10; i++) {
          const j = Math.floor(Math.random() * ground.length);
          pass += ground.charAt(j)
        }
        setId(pass)
    }, [setId]);

    useEffect(() => {
        IdGenerator()
    }, [IdGenerator])

    const authenticate = (ischeck) => {
        if(ischeck) {
            setSpotifyLogin(true)
            localStorage.setItem('spotifylogin', true)
        } 
        else {
            setSpotifyLogin(false)
            localStorage.setItem('spotifylogin', false)
        }
    }
    
    const register = (e) => {
        e.preventDefault()
        
        const form = e.target.closest('form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        if(spotifyLogin) {
            redirectToAuth()
            localStorage.setItem('waveformlogin', true)
        } else {
            setWaveFormLogin(true)
            localStorage.setItem('waveformlogin', true)
        }
    }

    useEffect(() => {
        if(waveFormLogin) {
            navigate('/home')
        }
    }, [waveFormLogin])

    const copyPassword = useCallback((btn) => {
        btn.preventDefault()
        IdRef.current?.select()
        IdRef.current?.setSelectionRange(0, 11)
        window.navigator.clipboard.writeText(Id)
    }, [Id])

    return (
        <div className="h-screen w-screen flex items-center justify-center montserrat-font font-normal">
            <div className="bg-black/10 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-600 mb-6">Log In</h2>
                
                <form className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="name" className="block text-gray-600">Name</label>
                        <input id="name" type="text" placeholder="Enter your name" className="w-full bg-transparent p-3 mt-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900 text-gray-300" autoComplete='off' required/>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-600">Email</label>
                        <input id="email" type="email" placeholder="Enter your email" className="w-full bg-transparent p-3 mt-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900 text-gray-300" autoComplete='off' required/>
                    </div>

                    <div>
                        <div className="flex flex-row justify-between">
                            <label htmlFor="user-id" className="block text-gray-600">User ID</label>
                            <div className='flex gap-2 cursor-pointer items-center justify-center' onClick={(e) => copyPassword(e)}>
                                <input type="text" value={Id} className="bg-transparent outline-none w-[94px] cursor-pointer text-gray-700 text-sm poppins-regular text-end" readOnly ref={IdRef} />
                                <i className='bx bx-copy-alt text-gray-700'/>
                            </div>
                        </div>
                        <input id="user-id" placeholder="Enter your unique ID" className="w-full bg-transparent p-3 mt-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900 text-gray-300" autoComplete='off' required minLength={10} maxLength={10}/>
                    </div>

                    <div className='flex items-center justify-center gap-3'>
                        <input type="checkbox" className='' id='auth' onChange={(e) => authenticate(e.target.checked)} />
                        <label htmlFor="auth" className='text-gray-600'>Connect to spotify</label>
                    </div>

                    <div>
                        <button onClick={(e) => register(e)} className="w-full py-3 bg-indigo-800 text-white rounded-md hover:bg-indigo-900 transition duration-200">Login</button>
                    </div>
                </form>
                
                <p className="mt-4 text-center text-gray-600">Don't have an account? 
                    <Link className="text-indigo-800 hover:underline ml-1">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default Authentication