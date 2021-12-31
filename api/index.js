const { ApolloServer } = require('apollo-server')
const { UsersApi } = require('./user/datasource/user')
const { userResolvers } = require('./user/resolvers/userResolvers')
const { userSchema } = require('./user/schema/user.graphql')

const main = async () => {
  const dataSources = () => ({ usersApi: new UsersApi() })
  const resolvers = [userResolvers]
  const typeDefs = [userSchema]
  const server = new ApolloServer({ dataSources, resolvers, typeDefs })
  const { url } = await server.listen()
  console.log(`Server listening on ${url}`)
}

main()
