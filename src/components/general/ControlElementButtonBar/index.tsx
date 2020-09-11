import React, { Fragment } from 'react';
import { FaArrowUp, FaArrowDown, FaCopy, FaTrash } from 'react-icons/fa';

interface ControlElementButtonBar {
    onAlterOrderUp: Function,
    onAlterOrderDown: Function,
    onCopy: Function,
    onRemove: Function,
}
const ControlElementButtonBar: React.FC<ControlElementButtonBar> = ({onAlterOrderUp, onAlterOrderDown, onCopy, onRemove }) => {
    return (<Fragment>
        <div className="btn-group">
            <button
                type="button"
                className="btn btn-link"
                title="Mover elemento para uma posição anterior"
                onClick={() => onAlterOrderUp()}
            >
                <FaArrowUp />
            </button>
            <button
                type="button"
                className="btn btn-link"
                title="Mover elemento para uma posição posterior"
                onClick={() => onAlterOrderDown()}
            >
                <FaArrowDown />
            </button>
            <button
                type="button"
                className="btn btn-link"
                title="Copiar elemento"
                onClick={() => onCopy()}
            >
                <FaCopy />
            </button>
            <button
                type="button"
                className="btn btn-link"
                title="Remover elemento"
                onClick={() => onRemove()}
            ><FaTrash />
            </button>            
        </div>
    </Fragment>);
}

export default ControlElementButtonBar;