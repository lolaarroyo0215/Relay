import Register from "./Register.jsx";
import {useContext} from "react";
import {UserContext} from "./UserContext.jsx";

export default function Routes() {
    const {username, id} = useContext(UserContext);

    if(username) {
        return <div>Logged in as {username}</div>;
    }

    return (
        <Register />
    );
}