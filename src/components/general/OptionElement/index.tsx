import React, { FC, Fragment, useState, useEffect } from 'react';
import { FaTrash, FaArrowUp, FaArrowDown, FaCopy } from 'react-icons/fa';
import { EVALUATION } from '../../../interfaces/elements';
import produce from 'immer';

import './styles.css';

interface OptionElementProps {
  optionElement: EVALUATION.SelectOptions,
  onUpdateHandler: Function,
  onRemoveHandler: Function,
  onCopyHandler: Function,
  onAlterOrderHandler: Function,
  index: number
}

const OptionElement: FC<OptionElementProps> = ({ optionElement, onAlterOrderHandler, onCopyHandler, onRemoveHandler, onUpdateHandler, index }) => {
  const [option, setOption] = useState<EVALUATION.SelectOptions>(optionElement);

  useEffect(() => { setOption(optionElement => optionElement) }, [optionElement]);

  useEffect(() => { update(option) }, [option]);

  const alterOrder = (optionElement: EVALUATION.SelectOptions, action: "up" | "down") => {
    onAlterOrderHandler(optionElement, action);
  }

  const copy = (optionElement: EVALUATION.SelectOptions) => {
    onCopyHandler(optionElement)
  }

  const remove = (optionElement: EVALUATION.SelectOptions) => {
    onRemoveHandler(optionElement)
  }

  const update = (optionElement: EVALUATION.SelectOptions) => {
    onUpdateHandler(optionElement);
  }

  return (
    <Fragment>
      <div className="question-choice-container">
        <div className="question-choice-label inline-display">
          <div className="question-choice-icon-group">
            <input
              aria-label="Opção 1"
              className="design-question-choice-icon"
              type="radio"
              name={option.name}            
              value={option.value} />
          </div>
        </div>
        <div className="question-choice-option-textbox inline-display">
          <input 
          aria-label="Texto da Opção de Escolha" 
          className="form-control" 
          placeholder="Insira um nome para esta opção." 
          maxLength={1000}    
          name={option.name}
          value={option.value}
          onChange={(e) => {
            const {value} = e.target;
            setOption({...option, value: value});
          }}
          />
        </div>

        <div className="question-btn-container">
          <div className='button-group'>
            <button
              type="button"
              className="btn btn-link"
              title="Mover elemento para uma posição anterior"
              onClick={() => { alterOrder(option, "up") }}
            >
              <FaArrowUp />
            </button>
            <button
              type="button"
              className="btn btn-link"
              title="Mover elemento para uma posição posterior"
              onClick={() => { alterOrder(option, "down") }}
            >
              <FaArrowDown />
            </button>
            <button
              type="button"
              className="btn btn-link"
              title="Copiar elemento"
              onClick={() => { copy(option) }}
            >
              <FaCopy />
            </button>
            <button
              type="button"
              className="btn btn-link"
              title="Remover elemento"
              onClick={() => { remove(option) }}
            ><FaTrash />
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default OptionElement;