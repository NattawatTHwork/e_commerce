import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        const client = await clientPromise;
        const db = client.db("e_commerce");

        const result = await db.collection("product").deleteOne({
            _id: ObjectId(id)
        });

        if (result.deletedCount > 0) {
            return res.json({ message: 'Product deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
