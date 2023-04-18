import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ProductList() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;

            const response = await axios.get('https://sujit-e-comm-dashboard-backend.onrender.com/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };



    const deleteProduct = async (id) => {
        console.warn(id);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const response = await axios.delete(`https://sujit-e-comm-dashboard-backend.onrender.com/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                await getProducts(); // Wait for delete to complete before reloading products list
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    const searchHandle = async (event) => {
        let key = event.target.value.toLowerCase();
        if (key) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user.token;
                const response = await axios.get(`https://sujit-e-comm-dashboard-backend.onrender.com/search/${key}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            getProducts();
        }
    };

    return (
        <div className="product-list">
            <h1>Products</h1>
            <input type="" className='search-product-box' placeholder='Search Product'
                onChange={searchHandle}
            />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>

            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id} >Update </Link>
                        </li>

                    </ul>
                )
                    : <h1>No Result Found</h1>
            }
        </div>
    );
}
