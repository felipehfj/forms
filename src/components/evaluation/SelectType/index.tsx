import React, { Fragment, FC, useState, useEffect } from 'react';
import { produce } from "immer";
import SliderSwitch from '../../general/SliderSwitch';
import { FaArrowUp, FaArrowDown, FaTrash, FaCopy } from 'react-icons/fa';
import './styles.css';
import ImageElement from '../../general/ImageElement';
import SelectOptionElement from '../../general/SelectOptionElement';
import LoggedUser from '../../general/LoggedUser';
import { EVALUATION } from '../../../interfaces/elements';
import { generate } from 'shortid';

interface SelectTypeProps {
  selectElement: EVALUATION.SelectElement,
  onRemoveHandler: Function,
  onUpdateHandler: Function,
  onCopyHandler: Function,
  onAlterOrderHandler: Function,
  index: number,
}

const SelectType: FC<SelectTypeProps> = ({ selectElement, onRemoveHandler, onAlterOrderHandler, onCopyHandler, onUpdateHandler, index }: SelectTypeProps) => {
  const [element, setElement] = useState<EVALUATION.SelectElement>(selectElement)

  useEffect(() => {
    if (selectElement) {
      setElement(selectElement => selectElement);
    }
  }, [selectElement])

  useEffect(() => {
    onUpdateHandler(element);
  }, [element])

  useEffect(() => {
    setElement({ ...element, order: index })
  }, [index])

  const addOption = () => {
    setElement(element => produce(element, draft => {
      draft.options.push({ id: generate(), name: element.id, value: "", ownerId: LoggedUser.userId, createdAt: new Date() });
    }))
  }

  const removeOption = (option: EVALUATION.SelectOptions) => {
    setElement(element =>
      produce(element, draft => {
        draft.options = draft.options.filter(x => x.id !== option.id)
        if (draft.response) {
          if (draft.response.id === option.id) {
            draft.response = undefined;
          }
        }
      }
      ));
  };

  useEffect(() => {
    onUpdateHandler(element);
  }, [element])

  const alterOrder = (element: EVALUATION.SelectElement, action: "up" | "down") => {
    if (onAlterOrderHandler) {
      onAlterOrderHandler(element, action);
    }
  }

  const copy = (element: EVALUATION.SelectElement) => {
    if (onCopyHandler) {
      onCopyHandler(element);
    }
  }

  const remove = (element: EVALUATION.SelectElement) => {
    if (onRemoveHandler) {
      onRemoveHandler(element);
    }
  }

  return (
    <Fragment>
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
                <ImageElement imgSrc={element.imagePath} onChange={((e: string) => { setElement({ ...element, imagePath: e }) })} />
              </div>
            </div>
          </div>

          <div className="response-area">
            <div className="row">
              <div className="col-xs-12" >
                <div className="form-group">
                  {
                    element.options.map((item, index) => (
                      <div key={item.id} >
                        <SelectOptionElement
                          index={index}
                          onAlterOrderHandler={(elementReceived: EVALUATION.SelectOptions, action: "up" | "down") => {
                            let idx = element.options.indexOf(elementReceived);

                            if (idx > -1) {
                              if (action === 'up') {
                                if (idx === 0) {
                                  return;
                                } else {
                                  let anterior = element.options[idx - 1];
                                  setElement(element => produce(element, draft => {
                                    draft.options[idx - 1] = elementReceived;
                                    draft.options[idx] = anterior;
                                  }))
                                }
                              }

                              if (action === 'down') {
                                if (idx === element.options.length - 1) {
                                  return;
                                } else {
                                  let posterior = element.options[idx + 1];
                                  setElement(elements => produce(elements, draft => {
                                    draft.options[idx + 1] = elementReceived;
                                    draft.options[idx] = posterior;
                                  }))
                                }
                              }
                            }
                          }}
                          onCopyHandler={(e: EVALUATION.SelectOptions) => {
                            let idx = element.options.indexOf(e);
                            if (idx > -1) {
                              setElement(element => produce(element, draft => {
                                let { id } = element;
                                draft.options.splice(idx, 0, { ...e, id: generate(), name: id });
                              }))
                            }
                          }}
                          onRemoveHandler={(e: EVALUATION.SelectOptions) => { removeOption(e) }}
                          onUpdateHandler={(e: EVALUATION.SelectOptions) => {
                            setElement(element => produce(element, draft => {
                              draft.options[index] = e;
                            }))
                          }}
                          optionElement={item}
                          onSelectHandler={(e: EVALUATION.SelectOptions) => {
                            setElement(element => produce(element, draft => {
                              draft.response = e;
                            }))
                          }}
                        />
                      </div>
                    ))
                  }
                  <button type="button" onClick={() => addOption()}>add</button>

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
      </div>
    </Fragment>
  );
}

export default SelectType;