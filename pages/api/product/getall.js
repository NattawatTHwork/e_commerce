import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("e_commerce");

        const products = await db.collection("product").find({}).toArray();

        return res.json(products);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
