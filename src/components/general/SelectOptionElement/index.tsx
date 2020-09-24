import React, { FC, Fragment, useState, useEffect, useContext } from 'react';
import { FaTrash, FaArrowUp, FaArrowDown, FaCopy, FaPlus } from 'react-icons/fa';
import { EVALUATION } from '../../../interfaces/elements';
import GotoSelection from '../../general/GotoSelection';
import FormContext from '../../../views/Forms/FormContext';

import './styles.css';

interface SelectOptionElementProps {
  optionElement: EVALUATION.SelectOptions,
  onUpdateHandler: Function,
  onRemoveHandler: Function,
  onCopyHandler: Function,
  onAlterOrderHandler: Function,
  onSelectHandler: Function,
  onAddElement?: Function,
  designMode?: boolean,
  index: number,  
}

const SelectOptionElement: FC<SelectOptionElementProps> = ({children, optionElement, onAlterOrderHandler, onCopyHandler, onRemoveHandler, onUpdateHandler, onSelectHandler, onAddElement, designMode = true, index }) => {
  const { form, sectionsSummary } = useContext(FormContext);
  const [option, setOption] = useState<EVALUATION.SelectOptions>(optionElement);

  useEffect(() => { setOption(optionElement => optionElement) }, [optionElement]);

  useEffect(() => {
    update(option)
  }, [option]);

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

  const onSelect = (optionElement: EVALUATION.SelectOptions) => {
    onSelectHandler(optionElement)
  }

  return (
    <Fragment>
      <div className="question-choice-container">
        <div className="question-choice-label inline-display">
          <div className="question-choice-icon-group">
            <input
              disabled={designMode}
              aria-label={option.name}
              className="design-question-choice-icon"
              type="radio"
              name={option.name}
              value={option.value}
              onChange={() => onSelect(option)}
            />
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
              const { value } = e.target;
              setOption({ ...option, value: value });
            }}
          />          
        </div>
        <div className='question-choice-option-goto inline-display'>
        <GotoSelection
            name={"navigation"}
            value={option.navigation}
            className="form-control"
            setSelection={(e: any) => {
              const {name, value} = e;              
              setOption({...option, [name]: value})}
            }
            sections={sectionsSummary ? sectionsSummary : []} />            
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
            {
              onAddElement ?
                <button
                  type="button"
                  className="btn btn-link"
                  title="Adicionar novo elemento"
                  onClick={() => { onAddElement(index) }}
                ><FaPlus />
                </button>
                :
                ''
            }

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SelectOptionElement;