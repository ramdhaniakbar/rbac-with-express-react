import React, { useEffect } from 'react';
import Layout from './layout';
import FormAddUser from '../components/FormAddUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const AddUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isError, user } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getMe());

		if (isError) {
			navigate('/');
		}

		if (user && user.role !== 'admin') {
			navigate('/dashboard');
		}
	}, [dispatch, isError, user, navigate]);
	return (
		<Layout>
			<FormAddUser />
		</Layout>
	);
};

export default AddUser;
