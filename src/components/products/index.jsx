import React, { useEffect, useState } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { Button } from '../ui/button';
import { ProductCard } from '../home/Components/ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState([]);
    const [categoriesAvailable, setCategoriesAvailable] = useState(["All"]);
    const [fileteredProducts, setFilteredProducts] = useState(filteredAndSortedProducts);
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        fetchProductData()
    }, [])

    const extractProductCategory = (products) => {
        let abTakUniques = []
        products?.map((product) => {
            if (abTakUniques.includes(product?.category)) {
            } else {
                abTakUniques.push(product?.category)
            }
        })
        setCategoriesAvailable([...categoriesAvailable, ...abTakUniques]);

    }

    const fetchProductData = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setFilteredAndSortedProducts(data);
                setFilteredProducts(data)
                extractProductCategory(data)
            });
    }

    const handleCategoryChange = (category111) => {
        setSelectedCategory(category111)
        if (category111 == 'All') {
            setFilteredProducts(filteredAndSortedProducts)
        } else {
            const categoryFilteredProduct = filteredAndSortedProducts.filter((product) => {
                return product?.category == category111
            })
            setFilteredProducts(categoryFilteredProduct)
        }
    }

    const handleSortingDropdownChange = (value) => {
        setSortBy(value)
        let sortedData
        if (value == "price-asc") {
            sortedData = filteredAndSortedProducts.sort((a, b) => a.price - b.price)
        }

        if (value === "price-desc") {
            sortedData = filteredAndSortedProducts.sort((a, b) => b.price - a.price)
        }
        setFilteredProducts(sortedData)
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-1'>
                <div className='container-wide py-8 md:py-12'>
                    <div className="mb-8">
                        <h1 className="font-display text-3xl md:text-4xl font-medium">
                            {selectedCategory === 'All' ? 'All Products' : selectedCategory.toUpperCase()}
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
                        </p>
                    </div>

                    {/* REMAINING FILTERS */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {categoriesAvailable.map((category) => {
                                return (
                                    <Button
                                        key={category}
                                        variant={selectedCategory === category ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleCategoryChange(category)}
                                    >
                                        {category}
                                    </Button>
                                )
                            })}
                        </div>

                        {/* Sort */}
                        <Select value={sortBy} onValueChange={handleSortingDropdownChange}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* PRODUCTS LISTING */}
                    {fileteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {fileteredProducts.map((product) => (
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
