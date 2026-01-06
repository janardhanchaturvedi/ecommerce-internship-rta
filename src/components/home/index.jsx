import React, { useState } from 'react'
import Header from '../layout/Header'
import HeroSection from './Components/HeroSection'
// import FeaturedProducts from './Components/FeaturedProducts'

export default function Home() {
    const [data, setData] = useState();
    let newData;
    setTimeout(() => {
        // newData = "Hello This is Janardhan"
        setData("Hello This is Janardhan setData")
    }, 100)
    return (
        <div className="min-h-screen flex flex-col">
            {newData}
            {data}
            <Header />
            <HeroSection />
            {/* <FeaturedProducts /> */}
        </div>
    )
}
