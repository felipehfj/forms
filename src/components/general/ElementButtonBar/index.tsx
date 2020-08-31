import React, { Fragment, FC } from 'react';

interface ElementButtonBarProps {
    addElement: Function
}

const ElementButtonBar: FC<ElementButtonBarProps> = (props: ElementButtonBarProps) => {
    return (
        <Fragment>
            <button
                onClick={() => props.addElement('text')}
            >
                text
            </button>
            <button
                onClick={() => props.addElement('paragraph')}
            >
                paragraph
            </button>
            <button
                onClick={() => props.addElement('date')}
            >
                date
            </button>
            <button
                onClick={() => props.addElement('number')}
            >
                number
            </button>
            <button
                onClick={() => props.addElement('email')}
            >
                email
            </button>
            <button
                onClick={() => props.addElement('select')}
            >
                select
            </button>
        </Fragment>
    );
}

export default ElementButtonBar;