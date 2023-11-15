import prisma from '@/libs/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'

// POST /api/task
// required name, start

// GET /api/task
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  //require login
  if (!session) {
    res.status(401).json({ message: 'you must be logged in.' })
    return
  }
  // POST create task
  if (req.method === 'POST') {
    const { name, start, type } = req.body
    const date = new Date(start)
    const result = await prisma.task.create({
      data: {
        name: name,
        start: date,
        repeatType: type,
        user: { connect: { id: session?.user?.id } },
      },
    })

    res.json(result)
  }
  // GET select task
  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany({ where: { user: session?.user } })
    res.json(tasks)
  }
}
