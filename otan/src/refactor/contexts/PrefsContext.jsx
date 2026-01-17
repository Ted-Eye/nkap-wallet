import { createContext, useContext, useState, useEffect } from 'react';
import {DEFAULT_SETTINGS} from '../lib/konstants/Defaults';
import {defaultSettings} from '../schemas/settingsSchema'


const PrefsContext = createContext();

export const PrefsProvider = ({ children }) => {
    const [prefs, setPrefs] = useState(() => {
        return JSON.parse(localStorage.getItem('prefs')) || defaultSettings;
    });

    useEffect(() => {
        localStorage.setItem('prefs', JSON.stringify(prefs));
    }, [prefs]);
    const onChangePrefs = (e) => {
        const { name, value } = e.target;
        setPrefs((prevPrefs) => ({
            ...prevPrefs,
            [name]: value,
        }));
    }
    const updatePrefs = (newPrefs) => {
        setPrefs((prevPrefs) => ({ ...prevPrefs, ...newPrefs }));
    };
    const value = {prefs, updatePrefs, onChangePrefs}

    return (
        <PrefsContext.Provider value={value}>
            {children}
        </PrefsContext.Provider>
    );
};

export const usePrefs = () => {
    return useContext(PrefsContext);
};