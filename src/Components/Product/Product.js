import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {productName,companyName,price,picture} = props.product;

    return (
        <Col className="mt-3">
            <Card className="shadow">
                <Card.Img variant="top" src={picture} style={{ width: '260px', height: '230px', margin: 'auto' }} />
                <Card.Body>
                    <Card.Title>{productName}</Card.Title>
                    <Card.Text>
                        Company Name : {companyName}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                    <p className="my-auto">Price : {price}</p>
                    <Link to={`/review/${props.product._id}`}><Button>Buy Now</Button></Link>
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default Product;