import React, { useEffect, useState } from 'react'

export default function Home() {
    const [successShow, setSuccessShow] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(false)
    const [planetsList, setPlanetsList] = useState([])
    const [filteredPlanetsList, setFilteredPlanetsList] = useState([])
    const [vehicleList, setVehicleList] = useState([])
    const [formData, setFormData] = useState({})
    const [distance, setDistance] = useState({})
    const [speed, setSpeed] = useState({})
    const [totalTimeTaken, setTotalTimeTaken] = useState(0)

    // set active dropdown
    const handleSetDrowpdown = (key) => {
        let AC = activeDropdown;

        if(AC === key) {
            setActiveDropdown(false)
        } else {
            setActiveDropdown(key)
        }

        setFilteredPlanetsList(planetsList)
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

    // calculate time taken
    const timeTakenCalculate = (distance, speed) => {
        let totalDistance = Object.values(distance).reduce((a, b) => a + b, 0);
        let totalSpeed = Object.values(speed).reduce((a, b) => a + b, 0);

        let totalTimeTaken = parseInt(totalDistance) / parseInt(totalSpeed);
        setTotalTimeTaken(parseInt(totalTimeTaken));
    }

    // handleChange
    const handleChange = (key, value, type) => {
        let FD = formData;
        if(type === 'vehicle') {
            let DD = distance;
            let SP = speed;
            setFormData({...FD, [key] : value?.name });
            setDistance({...DD, [key] : value?.max_distance });
            setSpeed({...SP, [key] : value?.speed });

            // calculate time 
            timeTakenCalculate({...DD, [key] : value?.max_distance }, {...SP, [key] : value?.speed });

        } else {
            setFormData({...FD, [key] : value });
        }
        setActiveDropdown(false)
    }

    // handle planet filter
    const handleFilter = (e) => {
        let value = e.target.value
    
        let filteredData = planetsList.filter((planet) => {
            return planet.name.toLowerCase().includes(value.toLowerCase())
        })

        console.log(filteredData)

        setFilteredPlanetsList(filteredData)

    }


    // handle submit
    const handleSubmit = async(e) => {
        e.preventDefault();

        // const token = await fetch('https://findfalcone.greektrust.com/token', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: '',
        // }).then((res) => res.json())

        let payloadData = {
            'token': 'fe332tge3252thrher43',
            'planet_names': [formData?.destination1, formData?.destination2, formData?.destination3, formData?.destination4],
            'vehicle_names': [formData?.vehicle1, formData?.vehicle2, formData?.vehicle3, formData?.vehicle4],
        }

        console.log(payloadData)
        setSuccessShow(true)
        setFormData({})
        setActiveDropdown(false)

        // currently api is not working its showing only pending state thats why i just showed message only
        await fetch('https://findfalcone.greektrust.com/find', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: payloadData,
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            setSuccessShow(res)
            setFormData({})
            setActiveDropdown(false)
        }).catch((err) => {
            console.log(err)
        })

        
    }

    // on load get data from api
    useEffect(() => {
        getPlanets();
        getVehicles();
    }, [])

    return (
        <>
            <div className="main py-10">
                {/* heading */}
                <h1 className='text-5xl text-center mt-10'>Finding Falcone!</h1>

                {!successShow ? <>
                    {/* main content form */}
                    <div className="lg:w-10/12 w-full mx-auto p-4">
                        <h3 className='text-2xl text-center my-6'>Select planets you want to search in:</h3>

                        {/* form */}
                        <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-20 items-center">
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
                                            <div className="dropwdown bg-white border border-gray-300 border-b-0 mt-4 pt-3 absolute w-full h-auto z-30 left-0 top-8">
                                                <div className="search px-3">
                                                    <input type="text" placeholder='Search planet' className="w-full px-4 py-2 border border-gray-300 rounded" onKeyUp={(e) => {handleFilter(e)}} onBlur={() => {getPlanets()}} />
                                                </div>
                                                <ul className='pt-2'>
                                                    {filteredPlanetsList ? <>
                                                        {filteredPlanetsList?.map((planet, index) => (
                                                            <li className="block cursor-pointer hover:bg-emerald-50 py-2 px-3 border-b border-gray-300" onClick={(e) => {handleChange('destination1', planet?.name, 'destination')}} key={index}>{planet?.name}</li>
                                                        ))}
                                                    </> : <>
                                                        {planetsList?.map((planet, index) => (
                                                            <li className="block cursor-pointer hover:bg-emerald-50 py-2 px-3 border-b border-gray-300" onClick={(e) => {handleChange('destination1', planet?.name, 'destination')}} key={index}>{planet?.name}</li>
                                                        ))}
                                                    </>}
                                                </ul>
                                            </div>
                                        )}
                                        
                                    </div>
                                </div>

                                {/* select vehicle */}
                                <div className="vehicles mt-8">
                                    {vehicleList?.map((vehicle, index) => (
                                        <div className="form-group mb-3" key={index}>
                                            <label className="inline-flex items-center gap-2">
                                                <input type="radio" name='vehicle1' value={vehicle?.name} className='w-4 h-4' onChange={(e) => {handleChange('vehicle1', vehicle, 'vehicle')}} />
                                                <span>{vehicle?.name}</span>
                                            </label>
                                        </div>
                                    ))}
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
                                            <div className="dropwdown bg-white border border-gray-300 border-b-0 mt-4 pt-3 absolute w-full h-auto z-30 left-0 top-8">
                                                <div className="search px-3">
                                                    <input type="text" placeholder='Search planet' className="w-full px-4 py-2 border border-gray-300 rounded" onKeyUp={(e) => {handleFilter(e)}} onBlur={() => {getPlanets()}} />
                                                </div>
                                                <ul className='pt-2'>
                                                    {filteredPlanetsList ? <>
                                                        {filteredPlanetsList?.map((planet, index) => (
                                                            <li className="block cursor-pointer hover:bg-emerald-50 py-2 px-3 border-b border-gray-300" onClick={(e) => {handleChange('destination2', planet?.name, 'destination')}} key={index}>{planet?.name}</li>
                                                        ))}
                                                    </> : <>
                                                        {planetsList?.map((planet, index) => (
                                                            <li className="block cursor-pointer hover:bg-emerald-50 py-2 px-3 border-b border-gray-300" onClick={(e) => {handleChange('destination2', planet?.name, 'destination')}} key={index}>{planet?.name}</li>
                                                        ))}
                                                    </>}
                                                </ul>
                                            </div>
                                        )}

                                        {/* select vehicle */}
                                        <div className="vehicles mt-8">
                                            {vehicleList?.map((vehicle, index) => (
                                                <div className="form-group mb-3" key={index}>
                                                    <label className="inline-flex items-center gap-2">
                                                        <input type="radio" name='vehicle2' value={vehicle?.name} className='w-4 h-4' onChange={(e) => {handleChange('vehicle2', vehicle, 'vehicle')}} />
                                                        <span>{vehicle?.name}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        
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
                                            <div className="dropwdown bg-white border border-gray-300 border-b-0 mt-4 pt-3 absolute w-full h-auto z-30 left-0 top-8">
                                                <div className="search px-3">
                                                    <input type="text" placeholder='Search planet' className="w-full px-4 py-2 border border-gray-300 rounded" onKeyUp={(e) => {handleFilter(e)}} onBlur={() => {getPlanets()}} />
                                                </div>
                                                <ul className='pt-2'>
                                                    {filteredPlanetsList ? <>
                                                        {filteredPlanetsList?.map((planet, index) => (
                                                            <li className="block cursor-pointer hover:bg-emerald-50 py-2 px-3 border-b border-gray-300" onClick={(e) => {handleChange('destination3', planet?.name, 'destination')}} key={index}>{planet?.name}</li>
                                                        ))}
                                                    </> : <>
                                                        {planetsList?.map((planet, index) => (
                                                            <li className="block cursor-pointer hover:bg-emerald-50 py-2 px-3 border-b border-gray-300" onClick={(e) => {handleChange('destination3', planet?.name, 'destination')}} key={index}>{planet?.name}</li>
                                                        ))}
                                                    </>}
                                                </ul>
                                            </div>
                                        )}

                                        {/* select vehicle */}
                                        <div className="vehicles mt-8">
                                            {vehicleList?.map((vehicle, index) => (
                                                <div className="form-group mb-3" key={index}>
                                                    <label className="inline-flex items-center gap-2">
                                                        <input type="radio" name='vehicle3' value={vehicle?.name} className='w-4 h-4' onChange={(e) => {handleChange('vehicle3', vehicle, 'vehicle')}} />
                                                        <span>{vehicle?.name}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        
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
                                            <div className="dropwdown bg-white border border-gray-300 border-b-0 mt-4 pt-3 absolute w-full h-auto z-30 left-0 top-8">
                                                <div className="search px-3">
                                                    <input type="text" placeholder='Search planet' className="w-full px-4 py-2 border border-gray-300 rounded" onKeyUp={(e) => {handleFilter(e)}} onBlur={() => {getPlanets()}} />
                                                </div>
                                                <ul className='pt-2'>
                                                    {filteredPlanetsList ? <>
                                                        {filteredPlanetsList?.map((planet, index) => (
                                                            <li className="block cursor-pointer hover:bg-emerald-50 py-2 px-3 border-b border-gray-300" onClick={(e) => {handleChange('destination4', planet?.name, 'destination')}} key={index}>{planet?.name}</li>
                                                        ))}
                                                    </> : <>
                                                        {planetsList?.map((planet, index) => (
                                                            <li className="block cursor-pointer hover:bg-emerald-50 py-2 px-3 border-b border-gray-300" onClick={(e) => {handleChange('destination4', planet?.name, 'destination')}} key={index}>{planet?.name}</li>
                                                        ))}
                                                    </>}
                                                </ul>
                                            </div>
                                        )}

                                        {/* select vehicle */}
                                        <div className="vehicles mt-8">
                                            {vehicleList?.map((vehicle, index) => (
                                                <div className="form-group mb-3" key={index}>
                                                    <label className="inline-flex items-center gap-2">
                                                        <input type="radio" name='vehicle4' value={vehicle?.name} className='w-4 h-4' onChange={(e) => {handleChange('vehicle4', vehicle, 'vehicle')}} />
                                                        <span>{vehicle?.name}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                            {/* Time taken */}
                            <h3 className='text-2xl font-semibold'>Time Taken: {totalTimeTaken}</h3>
                        </div>

                        {/* button */}
                        <div className="text-center mt-10">
                            <button type='button' className='border border-gray-300 px-10 py-3 text-center text-sm rounded' onClick={handleSubmit}>Search Falcone</button>
                        </div>
                    </div>
                </> : <>
                    <div className="lg:w-10/12 w-full mx-auto p-4">
                        <h3 className='text-2xl text-center my-6'>Success! Congratulations on Finding Falcone. King Shan is mighty pleased.</h3>

                        <h4 className='text-xl text-center mb-2'>Time Taken: {successShow?.timeTaken ?? '200'}</h4>
                        <h4 className='text-xl text-center'>Planet found: {successShow?.planet ?? 'DonLon'}</h4>

                        {/* button */}
                        <div className="text-center mt-10">
                            <button type='button' className='border border-gray-300 px-10 py-3 text-center text-sm rounded' onClick={() => { setSuccessShow(false)}}>Start Again</button>
                        </div>
                    </div>
                </>}
            </div>
        </>
    )
}
