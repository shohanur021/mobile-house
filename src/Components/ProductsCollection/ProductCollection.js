import React, { useEffect, useState } from 'react';
import { CardDeck } from 'react-bootstrap';
import Product from '../Product/Product';

const ProductCollection = () => {
    const [products,setProducts] = useState([])

    useEffect(() => {
        fetch('https://murmuring-castle-06673.herokuapp.com/db/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    return (
        <div className="container mb-3">
            <CardDeck className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                {
                    products.map(pd => <Product product={pd} key={pd._id}></Product>)
                } 
            </CardDeck>
        </div>
    
    );
};

export default ProductCollection;