import React, { Fragment, FC } from 'react';
import { FaParagraph, FaCalendar, FaDotCircle, FaAt, FaRegCheckSquare, FaFont, FaHashtag } from 'react-icons/fa';
interface ElementButtonBarProps {
    addElement: Function,
    index?: number,
}

const ElementButtonBar: FC<ElementButtonBarProps> = (props: ElementButtonBarProps) => {
    return (
        <Fragment>
            <div className="btn-group">
                <button
                    className="btn btn-link"
                    title="Texto - Adiciona um elemento que permite a obtenção de um texto."
                    onClick={() => props.addElement('text', props.index)}
                >
                    <FaFont />
                    
            </button>
                <button
                    className="btn btn-link"
                    title="Parágrafo - Adiciona um elemento que permite a obtenção de um parágrafo."
                    onClick={() => props.addElement('paragraph', props.index)}
                >
                    <FaParagraph />
                    
            </button>
                <button
                    className="btn btn-link"
                    onClick={() => props.addElement('date', props.index)}
                >
                    <FaCalendar />
                    
            </button>
                <button
                    className="btn btn-link"
                    onClick={() => props.addElement('number', props.index)}
                >
                    <FaHashtag />
                    
            </button>
                <button
                    className="btn btn-link"
                    onClick={() => props.addElement('email', props.index)}
                >
                    <FaAt />
                                </button>
                <button
                    className="btn btn-link"
                    onClick={() => props.addElement('select', props.index)}
                >
                    <FaDotCircle />
                    
            </button>
                <button
                    className="btn btn-link"
                    onClick={() => props.addElement('multiple', props.index)}
                >
                    <FaRegCheckSquare />
                    
            </button>
            </div>
        </Fragment>
    );
}

export default ElementButtonBar;