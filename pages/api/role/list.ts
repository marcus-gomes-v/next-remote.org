import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '../../../lib/session';
import db from '../../../lib/db';
import { withIronSessionApiRoute } from 'iron-session/next';

type Data = {
    rolesData: unknown
}

export default withIronSessionApiRoute(listOffers, sessionOptions);

async function listOffers (
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    try {
        const roles = await db.collection('roles').where('author.uid', '==', req.session.user?.uid).get();

        const rolesData = roles.docs.map(entry => ({
            id: entry.id,
            ...entry.data()
        }));
        res.status(200).json({ rolesData });
    } catch (_error) {
        res.status(400).end();
    }
}
