import React, { useState } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { Button } from '../ui/button';

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState([]);

    // Create Function Fetch all proucts


    // use useEffect add the function for fetching products

    //api data will be stored in setFilteredAndSortedProducts
    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-1'>
                <div className='container-wide py-8 md:py-12'>
                    <div className="mb-8">
                        <h1 className="font-display text-3xl md:text-4xl font-medium">
                            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            {/* {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'} */}
                        </p>
                    </div>

                    {/* REMAINING FILTERS */}

                    {/* PRODUCTS LISTING */}
                    {filteredAndSortedProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {filteredAndSortedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">No products found in this category.</p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => handleCategoryChange('All')}
                            >
                                View All Products
                            </Button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
