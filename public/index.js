
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
                  users{
                      id
                      name
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
        <div>
            {data ? data.users.map(i => <p key={i.id}>{i.id} - {i.name}</p>):""}
        </div>
    )
}


ReactDOM.render(<App/>, document.getElementById('root') )




/** <script type="text/javascript" src="index.js"></script> */

