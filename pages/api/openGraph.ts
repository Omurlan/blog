import { NextApiRequest, NextApiResponse } from 'next';
import og from 'open-graph';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    if (req.url) {
      const link = decodeURIComponent(req.url?.split('?url=')[1]);

      og(link, (error, meta) => {
        if (meta) {
          res.json({ success: 1, meta });
        } else {
          res.json({ success: 0, meta: {} });
        }
      });
    } else {
      res.json({ success: 0, meta: {} });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
