import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCategory() {
    return (
        <section className="container-wide py-16 md:py-24 border-t border-border">
            <h2 className="font-display text-2xl md:text-3xl font-medium mb-10 text-center">
                Shop by Category
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { name: 'Home', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80' },
                    { name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
                    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
                ].map((category) => (
                    <Link
                        key={category.name}
                        to={`/products?category=${category.name}`}
                        className="group relative aspect-[4/3] overflow-hidden bg-secondary"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-display text-xl font-medium text-background">
                                {category.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
