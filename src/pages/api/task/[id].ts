import prisma from '@/libs/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  //require login
  if (!session) {
    res.status(401).json({ message: 'you must be logged in.' })
    return
  }
  const id = req.query.id
  if (typeof id !== 'string') {
    res.status(400).end()
    return
  }
  // POST: update task
  if (req.method === 'POST') {
    const { name, start, type } = req.body
    const date = new Date(start)
    const result = await prisma.task.update({
      where: { id: id },
      data: {
        name: name,
        start: date,
        repeatType: type,
      },
    })
    res.json(result)
  }
}
