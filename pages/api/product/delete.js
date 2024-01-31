import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
    try {
        const { id } = req.query;
        const { deleted } = req.body;

        if (deleted != 0 && deleted != 1) {
            return res.status(400).json({ error: 'Invalid input deleted' });
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
                    deleted: deleted
                }
            }
        );

        if (result.matchedCount === 1) {
            return res.json({ message: 'Product deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
