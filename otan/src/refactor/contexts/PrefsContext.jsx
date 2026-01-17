import { createContext, useContext, useState, useEffect } from 'react';
import {DEFAULT_SETTINGS} from '../lib/konstants/Defaults';


const PrefsContext = createContext();

export const PrefsProvider = ({ children }) => {
    const [prefs, setPrefs] = useState(() => {
        return JSON.parse(localStorage.getItem('prefs')) || DEFAULT_SETTINGS;
    });

    useEffect(() => {
        localStorage.setItem('prefs', JSON.stringify(prefs));
    }, [prefs]);

    const updatePrefs = (newPrefs) => {
        setPrefs((prevPrefs) => ({ ...prevPrefs, ...newPrefs }));
    };


    return (
        <PrefsContext.Provider value={{...prefs, updatePrefs }}>
            {children}
        </PrefsContext.Provider>
    );
};

export const usePrefs = () => {
    return useContext(PrefsContext);
};