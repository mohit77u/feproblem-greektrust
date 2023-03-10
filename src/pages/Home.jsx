import React, { useEffect, useState } from 'react'

export default function Home() {
    const [activeDropdown, setActiveDropdown] = useState(false)
    const [planetsList, setPlanetsList] = useState([])
    const [vehicleList, setVehicleList] = useState([])
    const [formData, setFormData] = useState({})
    const [destinations, setDestinations] = useState({})
    const [vehicles, setVehicles] = useState({})

    // set active dropdown
    const handleSetDrowpdown = (key) => {
        let AC = activeDropdown;

        if(AC === key) {
            setActiveDropdown(false)
        } else {
            setActiveDropdown(key)
        }
    }

    // get Planets 
    const getPlanets = () => {
        fetch('https://findfalcone.geektrust.com/planets')
        .then((res) => res.json())
        .then((res) => {
            setPlanetsList(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    // get Vehicles 
    const getVehicles = () => {
        fetch('https://findfalcone.geektrust.com/vehicles')
        .then((res) => res.json())
        .then((res) => {
            setVehicleList(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    // handleChange
    const handleChange = (key, value) => {
        let FD = formData;
        setFormData({...FD, [key] : value });
        setActiveDropdown(false)
    }

    // on load
    useEffect(() => {
        getPlanets();
        getVehicles();
    }, [])

    return (
        <>
            <div className="main py-20">
                {/* heading */}
                <h1 className='text-5xl text-center mt-10'>Finding Falcone!</h1>

                {/* main content form */}
                <div className="lg:w-8/12 md:w-10/12 w-full mx-auto p-4">
                    <h3 className='text-2xl text-center my-6'>Select planets you want to search in:</h3>

                    {/* form */}
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-col2-1 gap-6 mt-20">
                        {/* destination two */}
                        <div className="destination-one">
                            <label className="block mb-2 text-lg">Destination One</label>
                            <div className="w-full">
                                <div className="search-box relative">
                                    <button type="button" className='w-full flex justify-between items-center border border-gray-300 rounded focus:outline-none px-3 py-2' onClick={() => {handleSetDrowpdown('destination1')}}>
                                    <span>{formData?.destination1 ?? 'Select Destination'}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={activeDropdown === 'destination1' ? "w-5 h-5 -rotate-180 transition-all duration-200" : "w-5 h-5 rotate-0 transition-all duration-200"}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>

                                    {/* dropwdown */}
                                    {activeDropdown === 'destination1' && (
                                        <div className="dropwdown border border-gray-300 border-b-0 mt-4 pt-3 absolute w-full h-auto z-30 left-0 top-8">
                                            <div className="search px-3">
                                                <input type="text" placeholder='Search planet' className="w-full px-4 py-2 border border-gray-300 rounded" />
                                            </div>
                                            <ul className='pt-2'>
                                                {planetsList?.map((planet, index) => (
                                                    <li className="block cursor-pointer hover:bg-emerald-50 py-2 px-3 border-b border-gray-300" onClick={(e) => {handleChange('destination1', planet?.name)}}key={index}>{planet?.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        </div>

                        {/* destination two */}
                        <div className="destination-two">
                            <label className="block mb-2 text-lg">Destination Two</label>
                            <div className="w-full">
                                <div className="search-box relative">
                                    <button type="button" className='w-full flex justify-between items-center border border-gray-300 rounded focus:outline-none px-3 py-2' onClick={() => {handleSetDrowpdown('destination2')}}>
                                        <span>{formData?.destination2 ?? 'Select Destination'}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={activeDropdown === 'destination2' ? "w-5 h-5 -rotate-180 transition-all duration-200" : "w-5 h-5 rotate-0 transition-all duration-200"}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>

                                    {/* dropwdown */}
                                    {activeDropdown === 'destination2' && (
                                        <div className="dropwdown border border-gray-300 border-b-0 mt-4 pt-3 absolute w-full h-auto z-30 left-0 top-8">
                                            <div className="search px-3">
                                                <input type="text" placeholder='Search planet' className="w-full px-4 py-2 border border-gray-300 rounded" />
                                            </div>
                                            <ul className='pt-2'>
                                                {planetsList?.map((planet, index) => (
                                                    <li className="block cursor-pointer hover:bg-emerald-50 py-2 px-3 border-b border-gray-300" onClick={(e) => {handleChange('destination2', planet?.name)}}key={index}>{planet?.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        </div>

                        {/* destination three */}
                        <div className="destination-three">
                            <label className="block mb-2 text-lg">Destination Three</label>
                            <div className="w-full">
                                <div className="search-box relative">
                                    <button type="button" className='w-full flex justify-between items-center border border-gray-300 rounded focus:outline-none px-3 py-2' onClick={() => {handleSetDrowpdown('destination3')}}>
                                        <span>{formData?.destination3 ?? 'Select Destination'}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={activeDropdown === 'destination3' ? "w-5 h-5 -rotate-180 transition-all duration-200" : "w-5 h-5 rotate-0 transition-all duration-200"}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>

                                    {/* dropwdown */}
                                    {activeDropdown === 'destination3' && (
                                        <div className="dropwdown border border-gray-300 border-b-0 mt-4 pt-3 absolute w-full h-auto z-30 left-0 top-8">
                                            <div className="search px-3">
                                                <input type="text" placeholder='Search planet' className="w-full px-4 py-2 border border-gray-300 rounded" />
                                            </div>
                                            <ul className='pt-2'>
                                                {planetsList?.map((planet, index) => (
                                                    <li className="block cursor-pointer hover:bg-emerald-50 py-2 px-3 border-b border-gray-300" onClick={(e) => {handleChange('destination3', planet?.name)}}key={index}>{planet?.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        </div>

                        {/* destination Four */}
                        <div className="destination-four">
                            <label className="block mb-2 text-lg">Destination Four</label>
                            <div className="w-full">
                                <div className="search-box relative">
                                    <button type="button" className='w-full flex justify-between items-center border border-gray-300 rounded focus:outline-none px-3 py-2' onClick={() => {handleSetDrowpdown('destination4')}}>
                                        <span>{formData?.destination4 ?? 'Select Destination'}</span>   
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={activeDropdown === 'destination4' ? "w-5 h-5 -rotate-180 transition-all duration-200" : "w-5 h-5 rotate-0 transition-all duration-200"}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>

                                    {/* dropwdown */}
                                    {activeDropdown === 'destination4' && (
                                        <div className="dropwdown border border-gray-300 border-b-0 mt-4 pt-3 absolute w-full h-auto z-30 left-0 top-8">
                                            <div className="search px-3">
                                                <input type="text" placeholder='Search planet' className="w-full px-4 py-2 border border-gray-300 rounded" />
                                            </div>
                                            <ul className='pt-2'>
                                                {planetsList?.map((planet, index) => (
                                                    <li className="block cursor-pointer hover:bg-emerald-50 py-2 px-3 border-b border-gray-300" onClick={(e) => {handleChange('destination4', planet?.name)}}key={index}>{planet?.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
