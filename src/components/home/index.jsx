import React, { useContext, useEffect, useState } from 'react'
import Header from '../layout/Header'
import HeroSection from './Components/HeroSection'
import FeaturedProducts from './Components/FeaturedProducts';
import ProductCategory from './Components/ProductCategory';
import ValuesSection from './Components/ValuesSection';
import Footer from '../layout/Footer';
import { UserContext } from './../../contexts/UserContext';

export default function Home() {
    const [data, setData] = useState();
    const user = useContext(UserContext);
    console.log("user", user)
    let newData = [];
    const userName = "Janardhan";

    return (
        <div className="min-h-screen flex flex-col">
            <Header userName={userName} />
            <HeroSection />
            <FeaturedProducts />
            <ProductCategory />
            <ValuesSection />
            <Footer />
        </div>
    )
}
