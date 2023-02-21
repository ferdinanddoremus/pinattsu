import db from '@/services/db'

const rides = async (req, res) => {
  const { name, date } = req.body
  if (!name || !date) {
    res.status(400).end()
    return
  }

  try {
    // const entries = await db.collection('entries').get()
    // const entriesData = entries.docs.map(entry => entry.data())

    const { id } = await db.collection('entries').add({
      ...req.body,
      created_at: new Date().toISOString(),
    })

    res.status(200).json({ id })
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

export default rides
