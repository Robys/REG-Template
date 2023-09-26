const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
//const {startStandaloneServer} = require('@apollo/server/standalone')
const express = require('express')
const {json} = require('body-parser')
const path = require('path')


const typeDefs = require('./config/typeDefs')
const resolvers = require('./config/resolvers')

async function StartApolloServer(){
    const app = express();

    const server = new ApolloServer({
    typeDefs,
    resolvers,
    });
    await server.start();
// Specify the path where we'd like to mount our server
    app.use('/graphql',json(),expressMiddleware(server));
    await new Promise((resolve) => app.listen({ port: 4000 }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000/`);

    app.use('/',express.static(path.join(__dirname, '/..', 'public')));
   
}

StartApolloServer()


