const fs = require('fs')

const ReadDataFile = () =>{
    const data = fs.readFileSync('data.json')
    return JSON.parse(data)
}

const data = ReadDataFile()

const UpdatateJsonFile = () =>{
    fs.writeFileSync('data.json', JSON.stringify(data),(err) => {
        if(err)
            throw err
    })
}

const WriteUserJsonData = (user) =>{
    
    const nuser = {"id":data.users.length.toString(),"name":user}
    data.users.push(nuser)
    UpdatateJsonFile()
}

const RemoveUserFromJsonData = (user) =>{
    data.users = data.users.filter((x) => x.id !== user)
    //console.log(data.users)
    UpdatateJsonFile()
}

const RemovePostFromJsonData = (post) =>{
    data.posts = data.posts.filter((x) => x.id !== post)
    //console.log(data.users)
    UpdatateJsonFile()
}


const WritePostOnJsonData = (author,content) =>{
    const post = {"id":data.posts.length.toString(),"author":author,"content":content}
    data.posts.push(post)
    UpdatateJsonFile()
}


const resolvers = {
    Post:{
        author: ({author}) =>{
            const person = data.users.find(x => x.id === author)
           // console.log(person)
            return person
        }
    },
    Query:{
        users: () => {
            return data.users
        },
        posts: () =>{
            return data.posts
        }
    },
    Mutation:{
        createUser: (_,args) =>{
            WriteUserJsonData(args.name)
            return data.users
        },
        deleteUser: (_,args) =>{
            RemoveUserFromJsonData(args.id)
            return data.users
        },
        createPost: (_,{author,content}) =>{
            WritePostOnJsonData(author,content)
            return data.posts
        },
        deletePost: (_,args) =>{
            RemovePostFromJsonData(args.id)
            return data.posts
        },
    }
}

module.exports = resolvers