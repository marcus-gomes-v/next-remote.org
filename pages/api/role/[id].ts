import type { NextApiRequest, NextApiResponse } from 'next';

import db from '../../../lib/db';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { id } = req.query as string | any;

    try {
        if (req.method === 'PUT') {
            await db.collection('offers').doc(id).update({
                ...req.body,
                updated: new Date().toISOString(),
            });
        } else if (req.method === 'GET') {
            const doc = await db.collection('offers').doc(id).get();
            if (!doc.exists) {
                res.status(404).end();
            } else {
                res.status(200).json(doc.data());
            }
        } else if (req.method === 'DELETE') {
            await db.collection('offers').doc(id).delete();
        }
        res.status(200).end();
    } catch (_error) {
        res.status(400).end();
    }
};
