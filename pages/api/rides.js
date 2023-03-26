import db from '@/services/db'
import { auth } from '@/services/firebase-admin'

const getUser = async req => {
  const authToken = req.headers.authorization
  const user = await auth.verifyIdToken(authToken)

  if (!authToken) {
    throw new Error('[pinattsu/auth] no auth token in headers')
  } else if (!user) {
    throw new Error('[pinattsu/auth] error while verifying user')
  } else {
    return user
  }
}

const rides = async (req, res) => {
  // console.log(req.headers)
  try {
    if (req.method === 'POST') {
      const user = await getUser(req)

      console.log(user)

      const { name, date } = req.body
      if (!name || !date) {
        res.status(400).end()
        return
      }

      const { id } = await db.collection('entries').add({
        ...req.body,
        created_at: new Date().toISOString(),
        createdBy: user.uid,
      })

      res.status(200).json({ id })
    } else if (req.method === 'GET') {
      const entries = await db.collection('entries').get()
      const entriesData = entries.docs.map(entry => {
        // TODO return id of the ride
        // console.log(entry)
        return entry.data()
      })

      res.status(200).json(entriesData)
    }
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}

export default rides
