const { RESTDataSource } = require('apollo-datasource-rest')

class UsersApi extends RESTDataSource {
  constructor() {
    super()

    this.baseURL = 'http://localhost:3000'
  }

  async setSubscriptionFromUser(user) {
    const subscription = await this.get(`/subscriptions/${user.subscription}`)
    const userWithSubscription = { ...user, subscription }
    return userWithSubscription
  }

  async getUser(id) {
    const user = await this.get(`/users/${id}`)

    return this.setSubscriptionFromUser(user)
  }

  async getUsers() {
    const users = await this.get('/users')
    const usersWithSubscription = users.map(user =>
      this.setSubscriptionFromUser(user)
    )
    return usersWithSubscription
  }

  async addUser(user) {
    const users = await this.get('/users')
    const id = users
      .sort((a, b) => {
        if (a.id > b.id) {
          return 1
        }

        if (a.id < b.id) {
          return -1
        }

        return 0
      })
      .reduce((acc, cur) => (cur.id === acc ? acc + 1 : acc), 1)
    const newUser = { ...user, id }
    return this.post('/users', newUser)
  }

  async updateUser(user) {
    const updatedUser = await this.put(`/users/${user.id}`, user)
    return this.setSubscriptionFromUser(updatedUser)
  }

  async deleteUser(id) {
    await this.delete(`/users/${id}`)
    return id
  }
}

module.exports = { UsersApi }
