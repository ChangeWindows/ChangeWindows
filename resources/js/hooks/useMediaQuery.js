import { useState, useEffect } from 'react';

export default function useMediaQuery(mediaQuery) {
    const [isVerified, setIsVerified] = useState(true);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(mediaQuery);
        const documentChangeHandler = () => setIsVerified(!!mediaQueryList?.matches);

        mediaQueryList.addEventListener('change', documentChangeHandler);

        documentChangeHandler();
        
        return () => {
            mediaQueryList.removeEventListener('change', documentChangeHandler);
        };
    }, [mediaQuery]);

    return isVerified;
};