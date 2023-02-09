import React from "react"

class UserList extends React.Component {
    constructor(props) {
        super(props);

        const {users} = this.props;
        this.state = {
            users
        }
    };
 render() {
    const { users } = this.state;
    return (
        <React.Fragment>
            <p>Пользователи этого сайта:</p>
            <div className="box" key={users.key}>
                <h4>Никнейм: {users.username}</h4>
                <p>Его ID: {users.id}</p>
            </div>
        </React.Fragment>
    );
    }
}

export default UserList;