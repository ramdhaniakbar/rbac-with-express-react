import React, { useEffect } from 'react';
import Layout from './layout';
import Welcome from '../components/Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Dashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isError } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getMe());

		if (isError) {
			navigate('/');
		}
	}, [dispatch, isError, navigate]);

	return (
		<Layout>
			<Welcome />
		</Layout>
	);
};

export default Dashboard;
