import Users from '../models/userModel.js';
import argon2 from 'argon2';

export const userLogin = async (req, res) => {
	const user = await Users.findOne({
		where: {
			email: req.body.email,
		},
	});

	if (!user) return res.status(404).json({ message: 'User tidak ditemukan!' });

	const passwordMatch = await argon2.verify(user.password, req.body.password);

	if (!passwordMatch)
		return res.status(400).json({ message: 'Invalid password' });

	req.session.userId = user.id;
	const uuid = user.uuid;
	const name = user.name;
	const email = user.email;
	const role = user.role;

	res.status(200).json({ uuid, name, email, role });
};

export const userMe = async (req, res) => {
	console.log(`INI ADALAH USER.ID ${req.session.userId}`);
	if (!req.session.userId)
		return res.status(401).json({ message: 'Mohon login ke akun Anda!' });

	const user = await Users.findOne({
		where: { id: req.session.userId },
		attributes: ['uuid', 'name', 'email', 'role'],
	});

	if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

	res.status(200).json(user);
};

export const userLogout = async (req, res) => {
	req.session.destroy((err) => {
		if (err) return res.status(400).json({ message: 'Tidak dapat logout' });
		res.status(200).json({ message: 'Anda berhasil logout' });
	});
};
