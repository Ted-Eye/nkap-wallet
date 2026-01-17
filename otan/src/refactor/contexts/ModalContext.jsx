import {createContext, useContext, useState} from 'react';

const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [mode, setMode] = useState(null)

    const handleOpenModal = (type, mode=null, data=null) => {
        setModalType(type);
        setModalData(data);
        setMode(mode)
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setModalType(null);
        setModalData(null);
    };

    const value = {isOpen, modalType, mode, modalData, handleOpenModal, handleCloseModal}

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    return useContext(ModalContext);
};