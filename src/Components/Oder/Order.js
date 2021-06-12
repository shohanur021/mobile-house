import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Order = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [order, setOrder] = useState([])

    useEffect(() => {
        fetch('https://murmuring-castle-06673.herokuapp.com/db/order?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setOrder(data))
    },[loggedInUser.email])

    return (
        <div className="container mt-2">
            <h4>Total Orders : {order.length}</h4>
            {
                order.map(order =>
                    <li key={order._id}>{order.name} orders {order.productName} in {new Date(order.orderDate).toDateString('dd/MM/yyyy')} which price is {order.price} taka.</li>
                )
            }
        </div>
    );
};

export default Order;