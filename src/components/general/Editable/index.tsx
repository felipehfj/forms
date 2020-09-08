import React, { useState, useEffect, Fragment } from 'react';

// import { Container } from './styles';
interface EditableProps {
    text: string,
    type: string,
    title?:string,
    placeholder: string,
    children: React.ReactChild,
    childRef: any,
}

const Editable: React.FC<EditableProps> = ({
    text,
    type,
    placeholder,
    title,
    childRef,
    children,
    ...props
}: EditableProps) => {
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        if (childRef && childRef.current && isEditing === true) {
            childRef.current.focus();
        }
    }, [isEditing, childRef]);

    // Event handler while pressing any key while editing
    const handleKeyDown = (event: any, type: any) => {
        // Handle when key is pressed        
        const { key } = event;
        const keys = ["Escape", "Tab"];
        const enterKey = "Enter";
        const allKeys = [...keys, enterKey]; // All keys array

        /* 
          - For textarea, check only Escape and Tab key and set the state to false
          - For everything else, all three keys will set the state to false
        */
        if (
            (type === "textarea" && keys.indexOf(key) > -1) ||
            (type !== "textarea" && allKeys.indexOf(key) > -1)
        ) {
            setEditing(false);
        }
    };

    /*
    - It will display a label is `isEditing` is false
    - It will display the children (input or textarea) if `isEditing` is true
    - when input `onBlur`, we will set the default non edit mode
    Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
    */
    return (
        <Fragment {...props}>
            {isEditing ? (
                <div
                    onBlur={() => setEditing(false)}
                    onKeyDown={e => handleKeyDown(e, type)}
                    title={title}
                >
                    {children}                    
                </div>
            ) : (
                    <div title={title}
                        onClick={() => setEditing(true)}
                    >
                        <span>
                            {text || placeholder || "Editable content"}
                        </span>
                    </div>
                )}
        </Fragment>
    );
};

export default Editable;