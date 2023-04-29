import React, { useEffect } from 'react';
import Layout from './layout';
import UserList from '../components/Userlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Users = () => {
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
	}, [dispatch, isError, navigate]);
	return (
		<Layout>
			<UserList />
		</Layout>
	);
};

export default Users;
