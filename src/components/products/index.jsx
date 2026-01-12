import React, { useEffect, useState } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { Button } from '../ui/button';
import { ProductCard } from '../home/Components/ProductCard';

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState([]);
    const [categoriesAvailable, setCategoriesAvailable] = useState([]);

    console.log("filteredAndSortedProducts", filteredAndSortedProducts)

    const extractProductCategory = (products) => {
        let abTakUniques = []
        products?.map((product) => {
            console.log("productproductproductproduct ", product)
            console.log(abTakUniques.includes(product?.category))
            if (abTakUniques.includes(product?.category)) {
            } else {
                abTakUniques.push(product?.category)
            }
        })
        console.log("abTakUniques", abTakUniques)
        setCategoriesAvailable(abTakUniques);

    }

    const fetchProductData = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setFilteredAndSortedProducts(data);
                extractProductCategory(data)
            });
    }
    useEffect(() => {
        fetchProductData()
    }, [])
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
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {categoriesAvailable.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleCategoryChange(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>

                        {/* Sort */}
                        {/* <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                            </SelectContent>
                        </Select> */}
                    </div>

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
