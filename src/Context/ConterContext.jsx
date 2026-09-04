import { createContext, useState } from "react";



export const ConterContext = createContext(0);


export default function ConterContextProvider({ children }) {
    
    const [conter, setConter] = useState(10);
    return <ConterContext.Provider value={ {conter , setConter} }>
        { children }
    </ConterContext.Provider>
}