const typeDefs = `#graphql
type User{
    id: ID!
    name: String
}
type Post{
    id: ID!
    author: User
    content: String
}
type Mutation{
    createUser(name:String!):[User!]!,
    deleteUser(id:ID!):[User!]!
    createPost(author:ID!,content:String):Post!
    }
type Query{
    users: [User!]!
    posts: [Post!]!
}
`

module.exports = typeDefs