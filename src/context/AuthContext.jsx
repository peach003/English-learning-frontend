import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    console.log(1);
    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded JWT:", decoded); // Debugging JWT for correct parsing

                setUser({
                    fullName: decoded.fullName || decoded.FullName || "Anonymous",
                    email: decoded.email || "",
                });

            } catch (error) {
                console.error("Invalid token:", error);
                setUser(null);
            }
        }
    }, []);

    useEffect(() => {
        console.log("AuthContext Updated user:", user); // Ensure that setUser() triggers the update
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
