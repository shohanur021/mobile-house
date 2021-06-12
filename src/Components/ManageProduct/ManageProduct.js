import React, { useEffect, useState } from 'react';
import { InputGroup,Button,FormControl } from 'react-bootstrap';

const ManageProduct = () => {
    const [products, setProducts] = useState([])
    const [updateInfo, setUpdateInfo] = useState(false)
    const [updatedProduct, setUpdatedProduct] = useState(null)
    const [updatedPrice, setUpdatedPrice] = useState(null)

    useEffect(() => {
        fetch('https://murmuring-castle-06673.herokuapp.com/db/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    function updateProduct(id) {
        const product = products.find(pd => pd._id === id);
        setUpdatedProduct(product);
        setUpdateInfo(true);
    }

    const handlePriceChange = (e) => {
        if(e.target.value>0){
            setUpdatedPrice(e.target.value);
        }
        else if(e.target.value<0){
            alert('Price can not be negative')
        }
    }

    function  updateThePrice(id){
        if(updatedPrice){
            fetch(`https://murmuring-castle-06673.herokuapp.com/db/update/${id}`, {
                method:'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({updatedPrice})
                })
                .then(res => res.json())
                .then(result => {
                    if(result){
                        setUpdateInfo(false);
                        setUpdatedPrice(null);
                        setUpdatedProduct(null);
                        const newProducts = products.map(pd => {
                            if(pd._id === id){
                                pd.price=updatedPrice
                                return pd;
                            }
                            else{
                                return pd;
                            }
                        })
                        setProducts(newProducts);
                    }
            })
        }
        else(
            alert('Plz enter the prize first')
        )
    } 

    function deleteProduct(id) {
        console.log(id);
        fetch(`https://murmuring-castle-06673.herokuapp.com/db/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if(result){
                    const newProducts = products.filter(pd => pd._id !== id)
                    console.log(newProducts);
                    setProducts(newProducts);
                }
            })
    }

    return (
        <div className="container mt-2 pt-2">
            <h3 className="mb-2">List of Products:</h3>
            {
                (updateInfo &&
                    <div className="border mx-3 my-4 p-2 shadow">
                        <h4>You can only update the price({updatedProduct.price}) of <span className="text-primary">{updatedProduct.productName}</span>:</h4>
                        <InputGroup className="my-3">
                        <FormControl type="number" min="1" placeholder="price" onBlur={handlePriceChange}/>
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={() => updateThePrice(updatedProduct._id)}>Update</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>)
            }
            <table className="table table-sm table-bordered">
                <thead>
                    <tr className="bg-info text-white ">
                        <th scope="col">Mobile Name</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Update Or Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((pd, index) =>
                        (index % 2 === 0 ?
                            <tr style={{ backgroundColor: '#DEDEEE' }} key={pd._id}>
                                <td>{pd.productName}</td>
                                <td>{pd.companyName}</td>
                                <td>{pd.price}</td>
                                <td className="d-flex justify-content-around"><Button onClick={() => updateProduct(pd._id)} className="btn-success">Edit</Button><Button onClick={() => deleteProduct(pd._id)} className="btn-danger">Remove</Button></td>
                            </tr>
                            :
                            <tr style={{ backgroundColor: '#F3D5B2' }} key={pd._id}>
                                <td>{pd.productName}</td>
                                <td>{pd.companyName}</td>
                                <td>{pd.price}</td>
                                <td className="d-flex justify-content-around"><Button onClick={() => updateProduct(pd._id)} className="btn-success">Edit</Button><Button onClick={() => deleteProduct(pd._id)} className="btn-danger">Remove</Button></td>
                            </tr>
                        )
                        )
                    }


                </tbody>
            </table>
        </div>
    );
};

export default ManageProduct;