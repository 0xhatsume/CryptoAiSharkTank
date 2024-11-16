import { useState, useEffect } from 'react';

export const useWebApp = () => {
    const [webApp, setWebApp] = useState<any>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const webapp = window?.Telegram?.WebApp;
        if (webapp) {
        setWebApp(webapp);
        setIsReady(true);
        }
    }, []);

    return { webApp, isReady };
};