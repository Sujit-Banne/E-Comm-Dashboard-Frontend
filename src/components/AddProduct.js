import React, { useState } from 'react'
import axios from 'axios'

export default function AddProduct() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    //image upload
    const [image, setImage] = useState('')
    const [uploadedImages, setUploadedImages] = useState([])

    const addProduct = async () => {
        if (!name || !price || !company || !category || uploadedImages.length === 0) {
            setError(true);
            return false;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const userId = user.id;

        try {
            const result = await axios.post('https://sujit-e-comm-dashboard-backend.onrender.com/add-product', {
                name,
                price,
                category,
                company,
                userId,
                photo: uploadedImages[0] // pass the first uploaded image URL as the product photo
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
            setImage("")
            setUploadedImages([]); // clear uploaded images after successfully adding the product
        } catch (error) {
            console.error(error);
        }
    };




    //cloudinary
    const submitImage = () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'sujit-cloudinary');
        data.append('cloud_name', 'dnfdw5o96');

        axios.post('https://api.cloudinary.com/v1_1/dnfdw5o96/image/upload', data)
            .then((response) => {
                console.log(response.data);
                const imageUrl = response.data.secure_url;
                setUploadedImages([...uploadedImages, imageUrl]);
            })
            .catch((error) => {
                console.log(error);
            });
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


            {/* //upload */}
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={submitImage}>Upload</button>


            <button onClick={addProduct} className='appButton' >Add Product</button>
        </div>

    )
}
