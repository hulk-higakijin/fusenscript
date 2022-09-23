import { users } from '@clerk/clerk-sdk-node'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await users.getUserList()
  res.status(200).json(data)
}
