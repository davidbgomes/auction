// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, House } from '@prisma/client'

type Data = {
  success: boolean,
  count?: number,
  data?: House[],
  message?: string,
}

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    try{
      const query = req.query
      const district = (query.district as string)
      const houses = await prisma.house.findMany({
        take:10,
      })
      res.json({ success: true, count: houses.length, data: houses });
    }
    catch(err){
      res.status(500).json({success: false, message: 'Internal Server Error'})
    }
  }
}
