import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';


const ProductDetailPage = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState();
    console.log("productDetails ", productDetails)

    const navigate = useNavigate();
    // const { addItem } = useCart();
    const getProductById = () => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProductDetails(data));

    }
    const product = getProductById(id || '');

    const [quantity, setQuantity] = useState(1);
    const [selectedVariants, setSelectedVariants] = useState({});
    const [selectedImage, setSelectedImage] = useState(0);


    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className=''>
                <img src={productDetails?.image} />
                <p className='text-2xl'>
                    {productDetails?.title}
                </p>
                <p>
                    {productDetails?.description}
                </p>
                <div>
                    <p className=''>
                        {productDetails?.category}
                    </p>
                </div>


            </div>
            <Footer />
        </div>
    );
};

export default ProductDetailPage;
