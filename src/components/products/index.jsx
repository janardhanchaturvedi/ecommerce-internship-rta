import React, { useState } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState("All");
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
                </div>
            </main>
            <Footer />
        </div>
    )
}
