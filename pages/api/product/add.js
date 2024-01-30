import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
    try {
        const { product_name, description, price, amount, image_path } = req.body;

        if (!product_name || !description || !price || !amount || !image_path) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const client = await clientPromise;
        const db = client.db("e_commerce");

        const existingProduct = await db.collection("product").findOne({ product_name });
        if (existingProduct) {
            return res.status(400).json({ error: 'Product name already exists' });
        }

        const result = await db.collection("product").insertOne({
            product_name,
            description,
            price,
            amount,
            image_path
        });

        if (result.acknowledged) {
            return res.json({ message: 'Product added successfully' });
        } else {
            return res.status(500).json({ error: 'Product addition failed' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
