import { Button } from './../../ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


export default function HeroSection() {
    return (
        <section className="relative bg-secondary/50 overflow-hidden">
            <div className="container-wide py-20 md:py-32">
                <div className="max-w-2xl">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
                        Thoughtfully Designed Goods
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground max-w-lg">
                        Quality craftsmanship meets timeless aesthetics. Curated essentials for modern living.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Button asChild size="lg">
                            <Link to="/products">
                                Shop Collection
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Decorative element */}
            <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-secondary/50" />
                <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80"
                    alt="Minimal interior"
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    )
}
