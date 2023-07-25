import { createContext } from 'react';

interface IModalContext {
    onOpenModal: boolean;
    setOnOpenModal: (value: boolean) => void;
}

export const ModalContext = createContext<IModalContext>({
    onOpenModal: false,
    setOnOpenModal: (value: boolean) => {
        throw new Error('setUser function must be overridden');
    }
});
