import { useContext } from "react";
import UserContext from "../UserContext"; // go up one level since UserContext.js is in src

function UserInfo() {
    const user = useContext(UserContext);

    return (
        <div>
            <h1>{user.name}</h1>
            <p>Age: {user.age}</p>
            <p>{user.bio}</p>
        </div>
    );
}

export default UserInfo;


