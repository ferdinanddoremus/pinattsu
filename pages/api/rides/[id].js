// import db from '@/services/db'

const rides = async (req, res) => {
  const { id } = req.query
  console.log(id)

  res.status(200).json({ content: 'all good', id })

  // try {

  // } catch (err) {
  //   console.error(err)
  //   res.status(400).end()
  // }
}

export default rides
