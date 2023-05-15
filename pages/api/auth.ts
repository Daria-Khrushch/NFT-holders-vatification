// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const KEY = 'kjsdncksdnicnsiodnc'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (!req.body) {
  //   res.statusCode = 404
  //   res.end('Error')
  //   return
  // }

  // const { data } = req.body
  
  console.log(req.body)



  // res.status(200).json({
  //   id: 1,
  //   token: jwt.sign({
  //     data
  //   }, KEY)
  // })
}
