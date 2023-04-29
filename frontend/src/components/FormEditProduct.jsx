import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditProduct = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [message, setMessage] = useState('');

	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const getProductById = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/products/${id}`
				);
				setName(response.data.name);
				setPrice(response.data.price);
			} catch (error) {
				if (error.response) {
					setMessage(error.response.data.message);
				}
			}
		};
		getProductById();
	}, [id]);

	const updateProductHandler = async (e) => {
		e.preventDefault();
		try {
			await axios.patch(`http://localhost:5000/products/${id}`, {
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
			<h2 className='subtitle'>Edit Product</h2>
			<div className='card is-shadowless'>
				<div className='card-content'>
					<div className='content'>
						<form onSubmit={updateProductHandler}>
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
										Update
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

export default FormEditProduct;
