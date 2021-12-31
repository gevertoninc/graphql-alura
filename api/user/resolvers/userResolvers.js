const { GraphQLScalarType } = require('graphql')

const users = [
  { avatar: 'https://robohash.org/quisutin.png?size=300x300&set=set1' },
  { avatar: 'https://robohash.org/repellatremet.png?size=300x300&set=set1' }
]

const userResolvers = {
  DateTime: new GraphQLScalarType({
    description: 'Datetime in ISO-8601 format',
    name: 'DateTime',
    parseLiteral: valueNode => new Date(valueNode.value),
    parseValue: value => new Date(value),
    serialize: value => new Date(value)
  }),
  Query: {
    firstUser: () => {
      const [user] = users
      return user
    },
    user: (_parent, args, context) =>
      context.dataSources.usersApi.getUser(args.id),
    users: (_parent, _args, context) => context.dataSources.usersApi.getUsers()
  },
  Mutation: {
    addUser: (_parent, args, context) =>
      context.dataSources.usersApi.addUser(args.user),
    updateUser: (_parent, args, context) =>
      context.dataSources.usersApi.updateUser(args),
    deleteUser: (_parent, args, context) =>
      context.dataSources.usersApi.deleteUser(args.id)
  }
}

module.exports = { userResolvers }
