

const Post = ({post}) =>{
  //console.log(post.author.name)
  return(
    <div className="card" style={{width:"600px", margin:"10px auto"}}>
      <div className="card-body">
      <h5 className="card-title">by {post.author.name}</h5>
      <p className="card-text">{post.content}</p>
      <button type="button" className="btn btn-primary">like</button>

      </div>

    </div>
  )
}

const App = () =>{
    const [data,SetData] = React.useState()

    React.useEffect(() =>{

        async function GetUsers() {
            return await fetch("http://localhost:4000/graphql", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: `query{
                  posts{
                      id
                      content
                      author{
                        id
                        name
                      }
                  }
              }`,
              }),
            })
              .then((res) => res.json())
              .then((result) => SetData(result.data));
          }
          
          GetUsers();


    },[])

    return (
        <div style={{margin:"0 auto"}}>
          <div style={{margin:"20px"}}>
            <h2>REG</h2>
            <p>React JS + Express + GraphQL</p>
          </div>
          
            {data ? data.posts.map(item => <Post key={item.id} post={item}/>):""}
        </div>
    )
}




ReactDOM.render(<App/>, document.getElementById('root') )




/** <script type="text/javascript" src="index.js"></script> */

