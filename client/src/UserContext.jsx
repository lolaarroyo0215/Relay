import {createContext, useEffect, useState} from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [username, setUsername] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:4000/profile', {
                    method: 'GET',
                    credentials: "include" // Ensure cookies are sent with request
                    });

                const contentType = response.headers.get('Content-type');

                if(contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    console.log('Profile Data: ', data);
                    // Update context state with the fetched data
                    setUsername(data.username);
                    setId(data.userId);
                } else {
                    const text = await response.text();
                    console.error('Received non-JSON response', text);
                }

            } catch (error) {
                console.error('Error fetching profile: ', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <UserContext.Provider value={{username, setUsername, id, setId}}>
            {children}
        </UserContext.Provider>
    );
}