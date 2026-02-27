import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, ImagePlus, Package, Loader2, Trash2 } from 'lucide-react';
import { UserContext } from '@/contexts/UserContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const PRODUCT_CATEGORIES = ['Bags', 'Kitchen', 'Home', 'Office', 'Accessories'];

export default function SellerProductForm() {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const getProductById = () => {

    }
    const addProduct = async (productDetails) => {
        console.log(productDetails)
        //         {
        //     "name": "SDASFSDFSDfdgdsfds",
        //     "description": "dsfgdsf",
        //     "price": 23453,
        //     "originalPrice": 345234522.94,
        //     "category": "Kitchen",
        //     "images": [
        //         "https://images.unsplash.com/photo-1770630927895-2057aa3a5673?q=80&w=1170&auto=format&fit=crop"
        //     ],
        //     "inStock": true
        // }
        const data = {
            name: productDetails?.name,
            price: productDetails?.price,
            category: productDetails?.category,
            description: productDetails?.description,
            inStock: productDetails?.inStock,
            image: productDetails?.images?.[0]
        }

        const response = await axios.post("http://localhost:3001/products", data)
        console.log("response of the add proudcti", response)
        if (response?.data?.sucess) {
            toast.success(response?.data?.message ?? "Product Added")
        }

    }
    const updateProduct = () => {

    }
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        images: [''],
        inStock: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditing && id) {
            const product = getProductById(id);
            if (product) {
                setForm({
                    name: product?.name,
                    description: product?.description,
                    price: String(product?.price),
                    originalPrice: product?.originalPrice ? String(product?.originalPrice) : '',
                    category: product?.category,
                    images: product?.images.length > 0 ? product.images : [''],
                    inStock: product.inStock,
                });
            }
        }
    }, [id, isEditing, getProductById]);

    // if (!user || user.role !== 'seller') {
    //     return <Navigate to="/seller/signup" replace />;
    // }

    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = 'Product name is required';
        else if (form.name.trim().length > 100) newErrors.name = 'Name must be under 100 characters';

        if (!form.price) newErrors.price = 'Price is required';
        else if (parseFloat(form.price) <= 0) newErrors.price = 'Price must be greater than 0';

        if (form.originalPrice && parseFloat(form.originalPrice) <= 0) {
            newErrors.originalPrice = 'Original price must be greater than 0';
        }

        if (!form.category) newErrors.category = 'Category is required';

        if (form?.description?.length > 1000) newErrors.description = 'Description must be under 1000 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageChange = (index, value) => {
        setForm(prev => {
            const newImages = [...prev?.images];
            newImages[index] = value;
            return { ...prev, images: newImages };
        });
    };

    const addImageField = () => {
        if (form.images.length < 4) {
            setForm(prev => ({ ...prev, images: [...prev.images, ''] }));
        }
    };

    const removeImageField = (index) => {
        if (form.images.length > 1) {
            setForm(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        const images = form?.images?.filter(img => img.trim() !== '');
        if (images?.length === 0) {
            images?.push('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80');
        }

        const productData = {
            name: form.name.trim(),
            description: form.description.trim(),
            price: parseFloat(form.price),
            originalPrice: form?.originalPrice ? parseFloat(form?.originalPrice) : undefined,
            category: form.category,
            images,
            inStock: form.inStock,
        };

        // Simulate a small delay for UX
        await new Promise(r => setTimeout(r, 400));

        if (isEditing && id) {
            updateProduct(id, productData);
            // toast({ title: 'Product updated', description: `${form.name} has been updated successfully.` });
        } else {
            addProduct({ ...productData });
            // toast({ title: 'Product listed!', description: `${form.name} is now live in the store.` });
        }

        setIsSubmitting(false);
        // navigate('/seller/dashboard');
    };

    const previewImages = form?.images?.filter(img => img.trim() !== '');

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Toaster />
            <Header />

            <main className="flex-1 py-8 md:py-12">
                <div className="container-wide max-w-3xl mx-auto px-4">
                    {/* Back button */}
                    <Button
                        variant="ghost"
                        className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
                        onClick={() => navigate('/seller/dashboard')}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>

                    {/* Page title */}
                    <div className="mb-8">
                        <h1 className="font-display text-3xl font-medium text-foreground mb-2">
                            {isEditing ? 'Edit Product' : 'Add New Product'}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEditing
                                ? 'Update your product details below.'
                                : 'Fill in the details below to list a new product in your store.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Package className="h-5 w-5 text-primary" />
                                    Product Information
                                </CardTitle>
                                <CardDescription>Basic details about your product</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="product-name">
                                        Product Name <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="product-name"
                                        placeholder="e.g. Handcrafted Leather Wallet"
                                        value={form?.name}
                                        onChange={(e) => {
                                            setForm(f => ({ ...f, name: e.target.value }));
                                            if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                                        }}
                                        className={errors.name ? 'border-destructive' : ''}
                                        maxLength={100}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="product-desc">Description</Label>
                                    <Textarea
                                        id="product-desc"
                                        placeholder="Describe your product — materials, dimensions, features..."
                                        value={form?.description}
                                        onChange={(e) => {
                                            setForm(f => ({ ...f, description: e.target.value }));
                                            if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
                                        }}
                                        rows={4}
                                        maxLength={1000}
                                        className={errors.description ? 'border-destructive' : ''}
                                    />
                                    <div className="flex justify-between">
                                        {errors.description ? (
                                            <p className="text-sm text-destructive">{errors.description}</p>
                                        ) : <span />}
                                        <p className="text-xs text-muted-foreground">{form?.description?.length}/1000</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="product-category">
                                        Category <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={form?.category}
                                        onValueChange={(val) => {
                                            setForm(f => ({ ...f, category: val }));
                                            if (errors.category) setErrors(prev => ({ ...prev, category: '' }));
                                        }}
                                    >
                                        <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PRODUCT_CATEGORIES.map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="text-sm text-destructive">{errors.category}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pricing */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Pricing</CardTitle>
                                <CardDescription>Set your product's price</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="product-price">
                                            Selling Price ($) <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="product-price"
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            placeholder="49.99"
                                            value={form?.price}
                                            onChange={(e) => {
                                                setForm(f => ({ ...f, price: e.target.value }));
                                                if (errors.price) setErrors(prev => ({ ...prev, price: '' }));
                                            }}
                                            className={errors.price ? 'border-destructive' : ''}
                                        />
                                        {errors.price && (
                                            <p className="text-sm text-destructive">{errors.price}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="product-original-price">
                                            Original Price ($) <span className="text-muted-foreground text-xs">(optional — shows as strikethrough)</span>
                                        </Label>
                                        <Input
                                            id="product-original-price"
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            placeholder="79.99"
                                            value={form?.originalPrice}
                                            onChange={(e) => {
                                                setForm(f => ({ ...f, originalPrice: e.target.value }));
                                                if (errors.originalPrice) setErrors(prev => ({ ...prev, originalPrice: '' }));
                                            }}
                                            className={errors.originalPrice ? 'border-destructive' : ''}
                                        />
                                        {errors.originalPrice && (
                                            <p className="text-sm text-destructive">{errors.originalPrice}</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Images */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <ImagePlus className="h-5 w-5 text-primary" />
                                    Product Images
                                </CardTitle>
                                <CardDescription>Add up to 4 image URLs for your product</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {form?.images?.map((img, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="flex-1 space-y-1">
                                            <Label htmlFor={`img-${index}`} className="sr-only">
                                                Image URL {index + 1}
                                            </Label>
                                            <Input
                                                id={`img-${index}`}
                                                type="url"
                                                placeholder="https://images.unsplash.com/..."
                                                value={img}
                                                onChange={(e) => handleImageChange(index, e.target.value)}
                                            />
                                        </div>
                                        {form.images.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-destructive flex-shrink-0"
                                                onClick={() => removeImageField(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}

                                {form?.images?.length < 4 && (
                                    <Button type="button" variant="outline" size="sm" onClick={addImageField} className="gap-2">
                                        <ImagePlus className="h-4 w-4" />
                                        Add Another Image
                                    </Button>
                                )}

                                {/* Image preview */}
                                {previewImages?.length > 0 && (
                                    <div className="pt-4 border-t border-border">
                                        <p className="text-sm text-muted-foreground mb-3">Preview</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {previewImages.map((img, i) => (
                                                <div
                                                    key={i}
                                                    className="aspect-square rounded-lg bg-secondary overflow-hidden border border-border"
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Preview ${i + 1}`}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.target).src = '/placeholder.svg';
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Stock */}
                        <Card>
                            <CardContent className="flex items-center justify-between py-6">
                                <div>
                                    <p className="font-medium text-foreground">In Stock</p>
                                    <p className="text-sm text-muted-foreground">Mark whether this product is currently available</p>
                                </div>
                                <Switch
                                    checked={form?.inStock}
                                    onCheckedChange={(checked) => setForm(f => ({ ...f, inStock: checked }))}
                                />
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Button type="submit" className="flex-1 gap-2" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        {isEditing ? 'Updating...' : 'Publishing...'}
                                    </>
                                ) : (
                                    isEditing ? 'Update Product' : 'Publish Product'
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="sm:w-auto"
                                onClick={() => navigate('/seller/dashboard')}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
