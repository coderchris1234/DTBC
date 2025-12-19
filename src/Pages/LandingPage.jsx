import React from 'react'
import Hero from '../Components/Hero'
import Service from '../Components/Service'
import Purpose from '../Components/Purpose'
import Hope from '../Components/Hope'
import Sermons from '../Components/Sermons'

const LandingPage = () => {
  return (
    <div>
        <Hero/>
        <Service />
        <Purpose />
        <Hope />
        <Sermons />
    </div>
  )
}

export default LandingPage