import React, { Fragment, FC } from 'react';
import { FaArrowUp, FaArrowDown, FaCopy, FaTrash, FaPlus, FaChevronDown } from 'react-icons/fa';
interface SectionButtonBarProps {
  element: any,
  onAlterOrder: (e: any, v: "up" | "down") => void,
  onCopy: Function,
  onRemove: Function,
  onAdd: Function,
  onCollapse: Function,
  index?: number,
}

const SectionButtonBar: FC<SectionButtonBarProps> = ({ element, onAlterOrder, onCopy, onRemove, onAdd, onCollapse, index }: SectionButtonBarProps) => {
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
          onClick={() => { onCopy(element, index); }}
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
      <span>|</span>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-link"
          title="Adicionar uma seção"
          onClick={() => { onAdd(element); }}
        ><FaPlus />
        </button>
        <button
          type="button"
          className="btn btn-link"
          title="Expandir/Recolher seção"
          onClick={() => { onCollapse(element); }}
        ><FaChevronDown />
        </button>
      </div>
    </Fragment>
  );
}

export default SectionButtonBar;