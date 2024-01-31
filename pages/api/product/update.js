import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
    try {
        const { id } = req.query;
        const { product_name, description, price, amount, image_path, status } = req.body;

        if (!product_name || !description || !price || !amount || !image_path || !status) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        if (!id) {
            return res.status(400).json({ error: 'Invalid iproduct ID' });
        }

        const client = await clientPromise;
        const db = client.db("e_commerce");

        const result = await db.collection("product").updateOne(
            {
                _id: ObjectId(id)
            },
            {
                $set: {
                    product_name: product_name,
                    description: description,
                    price: price,
                    amount: amount,
                    image_path: image_path,
                    status: status
                }
            }
        );

        if (result.matchedCount === 1) {
            return res.json({ message: 'Product updated successfully' });
        } else {
            return res.status(500).json({ error: 'Product update failed' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
