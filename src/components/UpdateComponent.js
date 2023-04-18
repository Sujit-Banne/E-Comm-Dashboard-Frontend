import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        console.warn(params);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const response = await axios.get(`https://sujit-e-comm-dashboard-backend.onrender.com/product/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setName(response.data.name);
            setPrice(response.data.price);
            setCategory(response.data.category);
            setCompany(response.data.company);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const updateProduct = async () => {
        console.warn(name, price, category, company);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const response = await axios.put(`https://sujit-e-comm-dashboard-backend.onrender.com/product/${params.id}`, {
                name,
                price,
                category,
                company,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input
                type="text"
                placeholder="Enter product name"
                className="inputBox"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />

            <input
                type="text"
                placeholder="Enter product price"
                className="inputBox"
                value={price}
                onChange={(e) => {
                    setPrice(e.target.value);
                }}
            />

            <input
                type="text"
                placeholder="Enter product category"
                className="inputBox"
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                }}
            />

            <input
                type="text"
                placeholder="Enter product company"
                className="inputBox"
                value={company}
                onChange={(e) => {
                    setCompany(e.target.value);
                }}
            />

            <button onClick={updateProduct} className="appButton">
                Update Product
            </button>
        </div>
    );
};

export default UpdateProduct;
