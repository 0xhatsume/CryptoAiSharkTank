import { useState, useEffect } from 'react';

// Add a helper function to check if device is mobile
const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const useWebApp = () => {
    const [webApp, setWebApp] = useState<any>(null);
    const [isReady, setIsReady] = useState(false);
    const [isMobileOrTelegram, setIsMobileOrTelegram] = useState(false);

    useEffect(() => {
        // Check if running in Telegram Web App environment
        const webapp = window?.Telegram?.WebApp;
        
        // Set mobile/telegram state
        setIsMobileOrTelegram(!!webapp || isMobileDevice());

        if (webapp) {
            setWebApp(webapp);
            setIsReady(true);
        } else if (import.meta.env.DEV) {
            setWebApp({
                ready: () => console.log('Mock WebApp ready'),
                setHeaderColor: (color: string) => console.log('Mock setting header color:', color)
            });
            setIsReady(true);
        }
    }, []);

    return { webApp, isReady, isMobileOrTelegram };
};