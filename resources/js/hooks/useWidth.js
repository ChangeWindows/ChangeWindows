import { useState, useCallback, useEffect } from 'react';

// Get the width of a given element
export default function useWidth(ref) {
    const [width, setWidth] = useState(0);

    const updateWidth = useCallback(() => {
        if (ref && ref.current) {
            const { width } = ref.current?.getBoundingClientRect();
            setWidth(width);
        }
    }, [ref]);

    useEffect(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);
        
        return () => {
            window.removeEventListener('resize', updateWidth);
        }
    }, [updateWidth])

    return width
}