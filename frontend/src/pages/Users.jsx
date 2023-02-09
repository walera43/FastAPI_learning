import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";


function UsersList() { 
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState()

    async function fetchData () {
    return fetch("/api/users")
          .then((response) => response.json())
          .then((data) => setUser(data));
  }

  useEffect(() => {
    fetchData();
  },[])


  return (
    <main>
        <div className="box" style={{"margin": "70px"}}>
            <h1 className="has-text-centered">Список пользователей</h1>
            <ul>
              {user && user.length > 0 && user.map((userObj, index) => (
                  <div className="box">
                    <li key={userObj.id}>{userObj.id}. {userObj.username}
                        <Link to={{pathname: '/user/'+ userObj.username}} className="button is-rounded is-small" style={{marginLeft: "4px"}}>Перейти</Link>
                    </li>
                  </div>
                ))}
            </ul>
        </div>
    </main>
  );
}

export default UsersList;