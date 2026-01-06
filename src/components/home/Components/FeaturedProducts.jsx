import React from 'react'
import { ProductCard } from './ProductCard'

export default function FeaturedProducts() {
    return (
        <section className="container-wide py-16 md:py-24">
            <div className="flex items-end justify-between mb-10">
                <div>
                    <h2 className="font-display text-2xl md:text-3xl font-medium">Featured</h2>
                    <p className="mt-2 text-muted-foreground">Handpicked favorites from our collection</p>
                </div>
                <Link
                    to="/products"
                    className="text-sm font-medium hover:underline underline-offset-4 hidden sm:block"
                >
                    View All
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="mt-10 text-center sm:hidden">
                <Button variant="outline" asChild>
                    <Link to="/products">View All Products</Link>
                </Button>
            </div>
        </section>
    )
}
