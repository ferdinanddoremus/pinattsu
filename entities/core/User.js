export class User {
  constructor({ username, firebaseId, email, avatar, xp }) {
    if (
      username === undefined ||
      firebaseId === undefined ||
      email === undefined ||
      avatar === undefined ||
      xp === undefined
    ) {
      throw new Error('[pinattsu/core] missing args while creating User class')
    }

    this.username = username
    this.firebaseId = firebaseId
    this.uid = firebaseId
    this.email = email
    this.avatar = avatar
    this.xp = xp
  }
}

export const userConverter = {
  toFirestore: user => ({
    username: user.username,
    firebaseId: user.firebaseId,
    uid: user.uid,
    email: user.email,
    avatar: user.avatar,
    xp: user.xp,
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new User(data)
  },
}
