import db from '@/services/db'

const rides = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { name, date } = req.body
      if (!name || !date) {
        res.status(400).end()
        return
      }

      const { id } = await db.collection('entries').add({
        ...req.body,
        created_at: new Date().toISOString(),
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
    res.status(400).end()
  }
}

export default rides
