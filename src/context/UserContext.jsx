import React, {createContext, useEffect, useState} from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [token] = localStorage.getItem("AntiVidosToken");

    return (
        <UserContext.Provider value={[token]}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserProvider;