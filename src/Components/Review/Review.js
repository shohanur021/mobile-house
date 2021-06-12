import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';

const Review = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const { id } = useParams();
    const [product, setProduct] = useState([])

    useEffect(() => {
        fetch(`https://murmuring-castle-06673.herokuapp.com/db/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])

    const confirmationOrder = () => {
        if (loggedInUser.email) {
            const productInfo = { ...product[0] }
            delete productInfo._id;

            const dateOfOrder = new Date();
            const oderInfo = { ...loggedInUser, ...productInfo }
            oderInfo.orderDate = dateOfOrder;

            fetch('https://murmuring-castle-06673.herokuapp.com/db/addOrders', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(oderInfo)
            })
                .then(res => res.json())
                .then(data => {
                    alert('Your order is placed')
                })
        }
        else{
            alert('Please login in first')
        }

    }

    return (
        <div className="container">
            <Container className="mt-2">
                <Row>
                    <Col md={6} lg={4} className="d-flex justify-content-center">
                        <img style={{ height: '260px', width: '280px' }} src={product[0]?.picture} alt=""></img>
                    </Col>
                    <Col md={6} lg={8} className="align-self-center shadow bg-body rounded p-3">
                        <h3 className="text-primary">{product[0]?.productName}</h3>
                        <p>Company Name: {product[0]?.companyName}</p>
                        <p> Price: {product[0]?.price} ৳</p>
                        <div className="d-flex justify-content-center button-container">
                            <button type="button" className="btn btn-success" onClick={confirmationOrder}>Order Confirm</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Review;