const bcrypt = require('bcryptjs');
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existing = bcrypt.compareSync(password, users[i].password)
        if (existing) {
          const userToSend = {...users[i]}
          delete userToSend.password;
          res.status(200).send(userToSend)
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const user = req.body
      let salt = bcrypt.genSaltSync(5)
      console.log(salt)
      let passwordHash = bcrypt.hashSync(user.password, salt)
      console.log(user.password, passwordHash)

        // console.log('Registering User')
        // console.log(req.body)
        const newUser = {
          ...user,
          password: passwordHash,
        }
        users.push(newUser)
        const userToSend = {...newUser}
        delete userToSend.password;
        console.log('USERS', users);
        res.status(200).send(userToSend)
    }
}
