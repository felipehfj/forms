import React, { Fragment, FC } from 'react';
import { FaParagraph, FaCalendar, FaDotCircle, FaAt, FaRegCheckSquare, FaFont, FaHashtag } from 'react-icons/fa';
interface ElementButtonBarProps {
    addElement: Function
}

const ElementButtonBar: FC<ElementButtonBarProps> = (props: ElementButtonBarProps) => {
    return (
        <Fragment>
            <div className="btn-group">
                <button
                    className="btn btn-link"
                    title="Texto - Adiciona um elemento que permite a obtenção de um texto."
                    onClick={() => props.addElement('text')}
                >
                    <FaFont />
                    
            </button>
                <button
                    className="btn btn-link"
                    title="Parágrafo - Adiciona um elemento que permite a obtenção de um parágrafo."
                    onClick={() => props.addElement('paragraph')}
                >
                    <FaParagraph />
                    
            </button>
                <button
                    className="btn btn-link"
                    onClick={() => props.addElement('date')}
                >
                    <FaCalendar />
                    
            </button>
                <button
                    className="btn btn-link"
                    onClick={() => props.addElement('number')}
                >
                    <FaHashtag />
                    
            </button>
                <button
                    className="btn btn-link"
                    onClick={() => props.addElement('email')}
                >
                    <FaAt />
                                </button>
                <button
                    className="btn btn-link"
                    onClick={() => props.addElement('select')}
                >
                    <FaDotCircle />
                    
            </button>
                <button
                    className="btn btn-link"
                    onClick={() => props.addElement('multiple')}
                >
                    <FaRegCheckSquare />
                    
            </button>
            </div>
        </Fragment>
    );
}

export default ElementButtonBar;