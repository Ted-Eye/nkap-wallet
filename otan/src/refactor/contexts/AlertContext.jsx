import { createContext, useContext, useState } from "react";
import { ALERT } from "../lib/konstants/Defaults";

const AlertContext = createContext();

export const AlertProvider = ({children}) => {
    // const [alert, setAlert] = useState({type: '', message: '', title: ''})
    const [alert, setAlert] = useState(null)
    const showAlert = (type, message, title) => {
        setAlert({type, message, title})
        setTimeout(() => {
            setAlert(null)
        }, 5000)
    }
    

    return (
        <AlertContext.Provider value={{alert, showAlert}}>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext)