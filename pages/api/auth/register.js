import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const client = await clientPromise;
        const db = client.db("e_commerce");

        const existingUser = await db.collection("user").findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.collection("user").insertOne({
            username,
            password: hashedPassword,
            role
        });

        if (result.acknowledged) {
            return res.json({ message: 'Registration successful' });
        } else {
            return res.status(500).json({ error: 'Registration failed' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
