import React, {useState} from 'react'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import InfoSection from '../components/InfoSection'

import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour, homeObjFive} from '../components/InfoSection/Data'

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
          <InfoSection {...homeObjFour}/>
          <InfoSection {...homeObjFive}/>
          <Footer />
        </>
    )
}

export default Home
 