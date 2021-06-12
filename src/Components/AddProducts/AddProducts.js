import axios from 'axios';
import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import './AddProduct.css'

const AddProducts = () => {
    const [product, setProduct] = useState({});

    const handleChange = (e) => {
        if (e.target.value) {
            const newProduct = { ...product }
            newProduct[e.target.name] = e.target.value;
            setProduct(newProduct)
        }
    }

    const handleImageUpload = (e) => {
        const imageData = new FormData();
        imageData.set('key', '8fc82789f3058f462aa1affcc352466d');
        imageData.append('image', e.target.files[0]);
        
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                const newProduct = { ...product }
                newProduct[e.target.name] = response.data.data.display_url;
                setProduct(newProduct)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
      

    const submitAddProduct = (e) => {
        if (Object.keys(product).length === 4) {
            fetch('https://murmuring-castle-06673.herokuapp.com/db/addProduct',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
            })
            .then(res => res.json())
            .then(result =>{
                if(result){
                    alert("Successfully Added");
                }
            })
        }

        e.preventDefault();
    }
    
    return (
        <div className="container  text-center mt-3">
            <h4>The product information which you want to add:</h4>
            <Form className="formStyle" onSubmit={submitAddProduct}>
                <Form.Row>
                    <Col className="mx-2 mt-3 mx-lg-4" >
                        <Form.Control name="productName" placeholder="mobile name" required onBlur={handleChange} />
                    </Col>
                    <Col className="mx-2 mt-3 mx-lg-4">
                        <Form.Control name="companyName" placeholder="company name" required onBlur={handleChange} />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col className="mx-2 mt-3 mx-lg-4">
                        <Form.Control name="price" type="number" placeholder="price" min="1" onBlur={handleChange} required/>
                    </Col>
                    <Col className="mx-2 mt-3 mx-lg-4">
                        <Form.File id="formcheck-api-regular" >
                            <Form.File.Input name="picture" onChange={handleImageUpload} required />
                        </Form.File>
                    </Col>
                </Form.Row>
                <Button className="my-3" type="submit">Submit form</Button>
            </Form>
        </div>
    );
};

export default AddProducts;