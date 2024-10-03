import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import * as apiClient from '../api-client';
import Toast from '../components/Toast';

type ToastMessage = {
    message: string;
    type: 'SUCCESS' | 'ERROR';
};

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const { isError, isFetching } = useQuery({
        queryKey: ['validateToken'],
        queryFn: apiClient.validateToken,
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isFetching) {
        // Loading Page
        return null;
    }

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage);
                },
                isLoggedIn: !isError && !isFetching
            }}
        >
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
};
