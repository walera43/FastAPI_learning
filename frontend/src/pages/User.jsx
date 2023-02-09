import { useEffect, useState, react } from "react";
import { Link, useLocation, useParams } from "react-router-dom";


function UserPage () {
    const params = useParams()
    const [user, setUser] = useState([]);
    const [videoLoad, setVideoLoad] = useState([])

    async function fetchData () {
        return await fetch("/api/user/" + params.username)
              .then((response) => response.json())
              .then((data) => setUser(data));
      }

    async function fetchVideo () {
        return await fetch(user[0].videos.map((videoId, index) => (
            "/video/"+videoId.id)))
            .then((response) => response.json())
            .then((data) => setVideoLoad(data));
    }
    
      useEffect(() => {
        fetchData();
        fetchVideo();
      },[])
    

     return(
        <main>
            {user && user.length > 0 &&
            <div className="box" style={{"margin": "70px"}}>
                <h1 className="has-text-centered">Ты находишься у {user[0].username}</h1>
                <h1>Его видео:</h1>
                {user[0].videos.length > 0 ?
                user[0].videos.map((videoObj, index) => (
                    <main>
                        <div className="box" style={{"margin": "20px"}}>
                            <h1 key={videoObj.id}>{index + 1}. {videoObj.title} - {videoObj.description}</h1>
                            <h1 src={'http://192.168.3.14:8080/'+videoObj.file}/>
                        </div>
                    </main>
                ))
                :
                <h1 style={{"marginLeft": "10px"}}>Пользователь еще ничего не загрузил. :((</h1>
                }
            </div>
            }
        </main>
    )
}
export default UserPage;