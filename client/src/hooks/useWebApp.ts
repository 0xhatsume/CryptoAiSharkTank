import { useState, useEffect } from 'react';

// Improved mobile detection with width check
const isMobileDevice = () => {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') return false;
    
    // Check screen width
    const isMobileWidth = window.innerWidth <= 768;
    
    // Check user agent
    const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
    
    // Check if it's specifically a tablet
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    
    // Return true only for mobile phones, not tablets or desktop
    return isMobileUserAgent && !isTablet && isMobileWidth;
};

export const useWebApp = () => {
    const [webApp, setWebApp] = useState<any>(null);
    const [isReady, setIsReady] = useState(false);
    const [isMobileOrTelegram, setIsMobileOrTelegram] = useState(false);

    useEffect(() => {
        // Check if running in Telegram Web App environment
        const webapp = window?.Telegram?.WebApp;
        
        // Update mobile/telegram state
        const updateMobileState = () => {
            setIsMobileOrTelegram(!!webapp || isMobileDevice());
        };

        // Initial check
        updateMobileState();

        // Add resize listener to update state when window is resized
        window.addEventListener('resize', updateMobileState);

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

        // Cleanup
        return () => {
            window.removeEventListener('resize', updateMobileState);
        };
    }, []);

    return { webApp, isReady, isMobileOrTelegram };
};