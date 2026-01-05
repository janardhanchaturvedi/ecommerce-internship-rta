import React from 'react'
import Header from '../layout/Header'
import HeroSection from './Components/HeroSection'

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <HeroSection />
        </div>
    )
}
