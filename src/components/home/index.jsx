import React, { useEffect, useState } from 'react'
import Header from '../layout/Header'
import HeroSection from './Components/HeroSection'
import FeaturedProducts from './Components/FeaturedProducts';
import ProductCategory from './Components/ProductCategory';
import ValuesSection from './Components/ValuesSection';
import Footer from '../layout/Footer';

export default function Home() {
    const [data, setData] = useState();
    let newData = [];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <HeroSection />
            <FeaturedProducts />
            <ProductCategory />
            <ValuesSection />
            <Footer />
        </div>
    )
}
