import { createContext } from 'react';

interface ILoadingContext {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

export const LoadingContext = createContext<ILoadingContext>({
    isLoading: false,
    setIsLoading: (value: boolean) => {
        throw new Error('setIsLoading function must be overridden');
    }
});
