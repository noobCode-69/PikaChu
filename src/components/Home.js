import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function Home() {

    let navigate = useNavigate();
    // console.log(navigate);  
    
    useEffect(() => {
        
        navigate("/pokemonlist/1")
    }, [])

  return (
    <></>
  )
}

export default Home