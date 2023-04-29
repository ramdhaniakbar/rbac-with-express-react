import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormAddProduct = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [message, setMessage] = useState('');

	const navigate = useNavigate();

	const addProductHandler = async (e) => {
		e.preventDefault();

		try {
			await axios.post('http://localhost:5000/products', {
				name,
				price,
			});
			navigate('/products');
		} catch (error) {
			if (error.response) {
				setMessage(error.response.data.message);
			}
		}
	};

	return (
		<div>
			<h1 className='title'>Products</h1>
			<h2 className='subtitle'>Add New Product</h2>
			<div className='card is-shadowless'>
				<div className='card-content'>
					<div className='content'>
						<form onSubmit={addProductHandler}>
							{message && <p>{message}</p>}
							<div className='field'>
								<label htmlFor='name' className='label'>
									Product Name
								</label>
								<div className='control'>
									<input
										type='text'
										id='name'
										className='input'
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder='Product Name'
									/>
								</div>
							</div>
							<div className='field'>
								<label htmlFor='price' className='label'>
									Price
								</label>
								<div className='control'>
									<input
										type='text'
										id='price'
										className='input'
										value={price}
										onChange={(e) => setPrice(e.target.value)}
										placeholder='Price'
									/>
								</div>
							</div>
							<div className='field'>
								<div className='control'>
									<button type='submit' className='button is-success'>
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormAddProduct;
