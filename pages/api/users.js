import { User, userConverter } from '@/entities/core/User'
import db from '@/services/db'

const users = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { uid, displayName, photoURL, email } = req.body

      if (!uid) {
        res.status(400).end()
        return
      }

      const user = new User({
        firebaseId: uid,
        username: displayName || '',
        avatar: photoURL || null,
        xp: 0,
        email: email,
      })

      const userRef = db.collection('users').doc(uid)
      await userRef.set(userConverter.toFirestore(user))

      res.status(200).json(user)
    }
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}

export default users
