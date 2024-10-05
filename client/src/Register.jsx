
import {useContext, useState} from "react";
import {UserContext} from "./UserContext.jsx";

function Register(){
    const [username, setUsername] = useState(''); //For the form input
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const {setUsername: setLoggedInUsername, setId} = useContext(UserContext); //Access context values

    const handleRegister = async () => {

        try {
                const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', //this allows cookies if needed
                body: JSON.stringify({
                    username,
                    password
                }),
            });

            console.log('Response status: ', response.status);
            const data = await response.json();
            console.log('Response data: ', data);

            if(response.ok){
                setMessage('User registered successfully.');
                console.log('User registered successfully', data);

                // Store the username and user ID in context
                setLoggedInUsername(username);
                setId(data.id);

            } else {
                setMessage('Register failed.Please try again');
                console.error('Registration failed: ', data);
            }
        } catch (error) {
            console.error('Error', error);
            setMessage('An error occurred. Please try again');
        }
    };

    return (
        <div className="bg-pink-50 h-screen flex items-center">
            <div className="w-64 mx-auto mb-12" >
                <input type="text"
                       placeholder="Username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       className="block w-full rounded-sm p-2 mb-2"/>

                <input type="password"
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="block w-full rounded-sm p-2 mb-2"/>

                <button className="bg-pink-500 text-white block w-full rounded-sm p-2" onClick={handleRegister}>Register</button>

                {/*Display success/error message*/}
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default Register;