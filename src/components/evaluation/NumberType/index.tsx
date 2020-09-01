import React, { Fragment, FC, useState, useEffect } from 'react';
import SliderSwitch from '../../general/SliderSwitch';
import { FaArrowUp, FaArrowDown, FaTrash, FaCopy } from 'react-icons/fa';
import './styles.css';
import ImageElement from '../../general/ImageElement';
import { EVALUATION } from '../../../interfaces/elements';

interface NumberTypeProps {
  numberElement: EVALUATION.NumberElement,  
  onRemoveHandler: Function,
  onUpdateHandler: Function,
  onCopyHandler: Function,
  onAlterOrderHandler: Function,
  index: number,
}

const TextType: FC<NumberTypeProps> = ({ numberElement, onRemoveHandler, onAlterOrderHandler, onCopyHandler, onUpdateHandler, index }: NumberTypeProps) => {
  const [element, setElement] = useState<EVALUATION.NumberElement>(numberElement)

  useEffect(() => {
    if (numberElement) {
      setElement(numberElement => numberElement);
    }
  }, [numberElement])

  useEffect(() => {
    onUpdateHandler(element);
  }, [element])

  useEffect(() =>{
    setElement({...element, order: index})
  },[index])

  const alterOrder = (element: EVALUATION.NumberElement, action: "up" | "down") => {
    if (onAlterOrderHandler) {
      onAlterOrderHandler(element, action);
    }
  }

  const copy = (element: EVALUATION.NumberElement) => {
    if (onCopyHandler) {
      onCopyHandler(element);
    }
  }

  const remove = (element: EVALUATION.NumberElement) => {
    if (onRemoveHandler) {
      onRemoveHandler(element);
    }
  }

  return (
    <Fragment>
      <div className="container">
        <div className="portlet light">
          <div className="portlet-title">
            <div className="caption">{element.order}</div>
            <div className="actions">
              <div className='action-button-group'>
                <button
                  type="button"
                  className="btn btn-link"
                  title="Mover elemento para uma posição anterior"
                  onClick={() => { alterOrder(element, "up"); }}
                >
                  <FaArrowUp />
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  title="Mover elemento para uma posição posterior"
                  onClick={() => { alterOrder(element, "down"); }}
                >
                  <FaArrowDown />
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  title="Copiar elemento"
                  onClick={() => { copy(element); }}
                >
                  <FaCopy />
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  title="Remover elemento"
                  onClick={() => { remove(element); }}
                ><FaTrash />
                </button>
              </div>
            </div>
          </div>
          <div className="portlet-body">

            <div className="title-area">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                  <div className="form-group">

                    <textarea
                      style={{ width: '100%', marginBottom: 10, resize: 'none' }}
                      name="title"
                      value={element.title}
                      rows={4}
                      maxLength={4000}
                      placeholder="Pergunta"
                      className="form-control"
                      onChange={e => {
                        const { name, value } = e.target;
                        console.log(e.target.name);
                        setElement({ ...element, [name]: value })
                      }}
                    />

                  </div>
                  <div className="form-group">
                    <textarea
                      style={{ width: '100%', resize: 'none' }}
                      name="subtitle"
                      value={element.subtitle}
                      rows={4}
                      maxLength={4000}
                      className="form-control"
                      placeholder="Descrição da pergunta"
                      onChange={e => {
                        const { name, value } = e.target;
                        setElement({ ...element, [name]: value })
                      }}
                    />
                  </div>
                </div>

                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <ImageElement imgSrc={element.imagePath} onChange={((e:string) => {setElement({...element, imagePath: e})})} />
                </div>
              </div>
            </div>

            <div className="response-area">
              <div className="row">
                <div className="col-xs-12" >
                  <div className="form-group">

                    <input
                      type="number"                      
                      style={{ width: '100%', resize: 'none', padding: '2rem' }}
                      name="response"
                      value={element.response}                      
                      className="form-control"
                      placeholder="Insira a sua resposta"
                      readOnly
                      onChange={e => {
                        const { name, value } = e.target;
                        setElement({ ...element, [name]: value })
                      }}
                    />

                  </div>
                </div>
              </div>

            </div>

            <div className='area-separator' />

            <div className="config-area">
              <div className="row">
                <div className="col-md-offset-8 col-md-4">
                  <div className="form-group" style={{ marginTop: '2rem', marginBottom: '2rem', paddingBottom: 10 }}>
                    <label
                      className="mt-checkbox"
                      style={{ marginRight: 10, verticalAlign: "top" }}>
                      Resposta obrigatória
                  </label>
                    <SliderSwitch
                      height={22}
                      width={50}
                      name="required"
                      checked={element.required}
                      onChange={(e: boolean) => {
                        setElement({ ...element, required: e })
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div>{JSON.stringify(element, null, 2)}</div>

        </div>
      </div>
    </Fragment>
  );
}

export default TextType;