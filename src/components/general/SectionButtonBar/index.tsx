import React, { Fragment, FC } from 'react';
import { FaArrowUp, FaArrowDown, FaCopy, FaTrash } from 'react-icons/fa';
interface SectionButtonBarProps {
    element: any,
    onAlterOrder: (e:any, v: "up"| "down") => void,
    onCopy:  (e:any) => void,
    onRemove:  (e:any) => void,
    index?: number,
}

const SectionButtonBar: FC<SectionButtonBarProps> = ({element, onAlterOrder, onCopy, onRemove, index}: SectionButtonBarProps) => {
    return (
        <Fragment>
            <div className="btn-group">
            <button
                type="button"
                className="btn btn-link"
                title="Mover elemento para uma posição anterior"
                onClick={() => { onAlterOrder(element, "up"); }}
              >
                <FaArrowUp />
              </button>
              <button
                type="button"
                className="btn btn-link"
                title="Mover elemento para uma posição posterior"
                onClick={() => { onAlterOrder(element, "down"); }}
              >
                <FaArrowDown />
              </button>
              <button
                type="button"
                className="btn btn-link"
                title="Copiar elemento"
                onClick={() => { onCopy(element); }}
              >
                <FaCopy />
              </button>
              <button
                type="button"
                className="btn btn-link"
                title="Remover elemento"
                onClick={() => { onRemove(element); }}
              ><FaTrash />
              </button>
            </div>
        </Fragment>
    );
}

export default SectionButtonBar;