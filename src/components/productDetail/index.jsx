import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { UserContext } from './../../contexts/UserContext';
import { ChevronLeft, Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';


const ProductDetailPage = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState();
    const user = useContext(UserContext);
    console.log("user 1111", user)
    console.log("productDetails ", productDetails)

    const navigate = useNavigate();
    // const { addItem } = useCart();
    const getProductById = () => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProductDetails(data));
    }
    useEffect(() => {
        getProductById(id)
    }, [id])

    const [quantity, setQuantity] = useState(1);
    const [selectedVariants, setSelectedVariants] = useState({});
    const [selectedImage, setSelectedImage] = useState(0);

    const handleAddToCart = () => {

    }


    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                <div className="container-wide py-8 md:py-12">
                    {/* Breadcrumb */}
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                        {/* Images */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-secondary overflow-hidden">
                                <img
                                    src={productDetails?.image}
                                    alt={productDetails?.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {productDetails?.images?.length > 1 && (
                                <div className="flex gap-3">
                                    {productDetails?.images?.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`w-20 h-20 bg-secondary overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-foreground' : 'border-transparent'
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${productDetails?.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div>
                            <div className="mb-6">
                                <p className="text-sm text-muted-foreground mb-2">{productDetails?.category}</p>
                                <h1 className="font-display text-3xl md:text-4xl font-medium">{productDetails?.name}</h1>
                                <div className="flex items-center gap-3 mt-4">
                                    <span className="text-2xl font-medium"> ₹ {productDetails?.price}</span>
                                    {productDetails?.originalPrice && (
                                        <span className="text-lg text-muted-foreground line-through">
                                            ₹ {productDetails?.originalPrice}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed mb-8">
                                {productDetails?.description}
                            </p>

                            {/* Variants */}
                            {productDetails?.variants && productDetails?.variants.length > 0 && (
                                <div className="space-y-6 mb-8">
                                    {productDetails?.variants.map((variant) => (
                                        <div key={variant.name}>
                                            <label className="text-sm font-medium mb-3 block">
                                                {variant.name}: {selectedVariants[variant.name] || 'Select'}
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {variant.options.map((option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() => setSelectedVariants(prev => ({
                                                            ...prev,
                                                            [variant.name]: option
                                                        }))}
                                                        className={`px-4 py-2 text-sm border transition-colors ${selectedVariants[variant.name] === option
                                                            ? 'border-foreground bg-foreground text-background'
                                                            : 'border-border hover:border-foreground'
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Quantity & Add to Cart */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center border border-border">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="p-3 hover:bg-secondary transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="p-3 hover:bg-secondary transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>

                                <Button
                                    size="lg"
                                    className="flex-1"
                                    onClick={handleAddToCart}
                                >
                                    {'Add to Cart'}
                                </Button>
                            </div>

                            {/* Info */}
                            <div className="space-y-4 pt-8 border-t border-border">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Availability</span>
                                    <span className={productDetails?.rating?.count > 0 ? 'text-foreground' : 'text-muted-foreground'}>
                                        {productDetails?.rating?.count > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>Free over $100</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related productDetailss */}
                    {/* {relatedProducts.length > 0 && (
                        <section className="mt-20 pt-16 border-t border-border">
                            <h2 className="font-display text-2xl font-medium mb-8">You May Also Like</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                                {relatedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    )} */}
                </div >
            </main >

            <Footer />
        </div >
    );
};

export default ProductDetailPage;
