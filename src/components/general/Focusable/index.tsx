import React, { FC, useRef, useState, useEffect } from 'react';

interface Focusable {
    isFocused: boolean,
    setFocused: Function,
}

const Focusable: FC = (children) => {
    const node = useRef<HTMLDivElement>(null);
    const [isFocused, setFocused] = useState<boolean>();

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    })

    const handleClick = (e: any) => {
        if (node && node.current && node.current.contains(e.target)) {
            setFocused(true);
        }
        setFocused(false);
    }

    return (
        <div ref={node}>
            {children}
        </div>
    );
}

export default Focusable;