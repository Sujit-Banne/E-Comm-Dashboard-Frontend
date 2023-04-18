import React, { useState } from 'react'
import axios from 'axios'

export default function AddProduct() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const addProduct = async () => {
        if (!name || !price || !company || !category) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user')).id;

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const result = await axios.post('https://sujit-e-comm-dashboard-backend.onrender.com/add-product', {
                name,
                price,
                category,
                company,
                userId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(result.data);

            // Reset form fields
            setName('');
            setPrice('');
            setCategory('');
            setCompany('');
            setError(false);
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder='Enter product price' className='inputBox'
                value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type="text" placeholder='Enter product category' className='inputBox'
                value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input type="text" placeholder='Enter product company' className='inputBox'
                value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}


            <button onClick={addProduct} className='appButton' >Add Product</button>
        </div>

    )
}
