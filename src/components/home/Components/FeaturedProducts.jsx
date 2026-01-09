import React, { useEffect, useState } from 'react'
import { ProductCard } from './ProductCard'
import { Link } from 'react-router-dom'
import { Button } from './../../ui/button';

export default function FeaturedProducts() {
    // Step : 4 Add the State to store the products
    const [products, setProducts] = useState([]);

    //Step 1 : Create a function fetchProductData
    const fetchProductData = () => {
        // Step 2: Get the data from the fake store api
        fetch('https://fakestoreapi.com/products?limit=4')
            .then(response => response.json())
            .then(data => setProducts(data));
        //Step : 3 Set the data in the state
    }

    // Step 5 : Call the backend api in the useEffect
    useEffect(() => {
        fetchProductData()
    }, [])

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
                {products?.map((product) => (
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
