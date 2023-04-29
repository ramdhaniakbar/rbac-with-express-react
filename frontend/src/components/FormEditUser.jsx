import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditUser = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [role, setRole] = useState('');
	const [message, setMessage] = useState('');

	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const getUserById = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/users/${id}`
				);
				setName(response.data.name);
				setEmail(response.data.email);
				setRole(response.data.role);
			} catch (error) {
				if (error.response) {
					setMessage(error.response.data.message);
				}
			}
		};
		getUserById();
	}, [id]);

	const updateUserHandler = async (e) => {
		e.preventDefault();

		try {
			await axios.patch(`http://localhost:5000/users/${id}`, {
				name,
				email,
				password,
				confirmPassword,
				role,
			});
			navigate('/users');
		} catch (error) {
			if (error.response) {
				setMessage(error.response.data.message);
			}
		}
	};
	return (
		<div>
			<h1 className='title'>Users</h1>
			<h2 className='subtitle'>Edit User</h2>
			<div className='card is-shadowless'>
				<div className='card-content'>
					<div className='content'>
						<form onSubmit={updateUserHandler}>
							<div className='field'>
								<label htmlFor='name' className='label'>
									Name
								</label>
								<div className='control'>
									<input
										type='text'
										id='name'
										className='input'
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder='Name'
									/>
								</div>
							</div>
							<div className='field'>
								<label htmlFor='email' className='label'>
									Email
								</label>
								<div className='control'>
									<input
										type='text'
										id='email'
										className='input'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder='Email'
									/>
								</div>
							</div>
							<div className='field'>
								<label htmlFor='password' className='label'>
									Password
								</label>
								<div className='control'>
									<input
										type='password'
										id='password'
										className='input'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder='******'
									/>
								</div>
							</div>
							<div className='field'>
								<label htmlFor='confirm_password' className='label'>
									Confirm Password
								</label>
								<div className='control'>
									<input
										type='password'
										id='confirm_password'
										className='input'
										value={confirmPassword}
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
										placeholder='******'
									/>
								</div>
							</div>
							<div className='field'>
								<label htmlFor='role' className='label'>
									Role
								</label>
								<div className='control'>
									<div className='select is-fullwidth'>
										<select
											value={role}
											onChange={(e) => setRole(e.target.value)}
										>
											<option value='admin'>Admin</option>
											<option value='user'>User</option>
										</select>
									</div>
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

export default FormEditUser;
