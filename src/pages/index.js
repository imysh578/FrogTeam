import React, {useState} from 'react'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import InfoSection from '../components/InfoSection'
import { homeObjOne, homeObjTwo, homeObjThree } from '../components/InfoSection/Data'
import ChartSection from '../components/ChartSection'

const Home = () => {
    const[isOpen, setIsOpen] = useState(false)
const toggle = () => {
    setIsOpen(!isOpen)
}
    return (
        <>
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Navbar toggle={toggle} />  
          <HeroSection />
          <ChartSection/>
          <InfoSection {...homeObjOne}/>
          <InfoSection {...homeObjTwo}/>
          <InfoSection {...homeObjThree}/>
        </>
    )
}

export default Home
 