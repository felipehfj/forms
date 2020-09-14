import React, { Fragment, FC, useState, useEffect, useRef } from 'react';
import { produce } from "immer";
import { generate } from 'shortid';
import SliderSwitch from '../../general/SliderSwitch';
import ControlElementButtonBar from '../../general/ControlElementButtonBar';
import ImageElement from '../../general/ImageElement';
import SelectOptionElement from '../../general/SelectOptionElement';
import LoggedUser from '../../general/LoggedUser';
import { EVALUATION } from '../../../interfaces/elements';
import './styles.css';

interface SelectTypeProps {
  selectElement: EVALUATION.SelectElement,
  onRemoveHandler: Function,
  onUpdateHandler: Function,
  onCopyHandler: Function,
  onAlterOrderHandler: Function,
  buttonBar?: any,
  index: number,
}

const SelectType: FC<SelectTypeProps> = ({ selectElement, onRemoveHandler, onAlterOrderHandler, onCopyHandler, onUpdateHandler, buttonBar, index }: SelectTypeProps) => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [isSelected, setSelected] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);

  const [element, setElement] = useState<EVALUATION.SelectElement>(selectElement)

  useEffect(() => {
    if (selectElement) {
      setElement(selectElement => selectElement);
    }
  }, [selectElement])

  useEffect(() => {
    setElement({ ...element, order: index })
  }, [index])

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

  const handleFocusClick = (e: any) => {
    if (node && node.current && node.current.contains(e.target)) {
      setSelected(true);
      return;
    }
    if (isUpdated) {
      onUpdateHandler(element);
      setIsUpdated(false);
    }
    setSelected(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleFocusClick);

    return () => {
      document.removeEventListener("mousedown", handleFocusClick)
    }
  })

  const handleElementChange = (name: any, value: any) => {
    setElement({ ...element, [name]: value });
    setIsUpdated(true);
  }

  return (
    <Fragment>
      <div className="portlet light" ref={node} style={isSelected ? { boxShadow: 'inset 0 0 1rem rgba(0,0,0,0.7)' } : {}}>
        <div className="portlet-title">
          <div className="actions">
            <div className='design-select-action-button-group' style={isSelected ? { display: 'inline-block' } : {}}>
              <ControlElementButtonBar
                onAlterOrderUp={() => alterOrder(element, "up")}
                onAlterOrderDown={() => alterOrder(element, "down")}
                onCopy={() => copy(element)}
                onRemove={() => remove(element)}
              />
            </div>
          </div>
        </div>
        <div className="portlet-body">

          <div className="design-select-title-area">
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
                      handleElementChange(name, value);
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
                      handleElementChange(name, value);
                    }}
                  />
                </div>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <ImageElement
                  imgSrc={element.imagePath}
                  onChange={(e: string) => {
                    handleElementChange('imagePath', e);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="design-select-response-area">
            <div className="row">
              <div className="col-xs-12" >
                <div className="form-group">
                  {
                    element.options.map((item, index) => (
                      <div key={item.id} >
                        <SelectOptionElement
                          index={index}
                          onAlterOrderHandler={(elementReceived: EVALUATION.SelectOptions, action: "up" | "down") => {
                            let options = produce(element.options, draft => {
                              let idx = element.options.indexOf(elementReceived);

                              if (idx > -1) {
                                if (action === 'up') {
                                  if (idx === 0) { return }
                                  else {
                                    let anterior = draft[idx - 1];

                                    draft[idx - 1] = elementReceived;
                                    draft[idx] = anterior;
                                  }
                                }

                                if (action === 'down') {
                                  if (idx === draft.length - 1) { return }
                                  else {
                                    let posterior = draft[idx + 1];

                                    draft[idx + 1] = elementReceived;
                                    draft[idx] = posterior;
                                  }
                                }
                              }
                            })
                            handleElementChange('options', options);

                          }}
                          onCopyHandler={(e: EVALUATION.SelectOptions) => {
                            let options = produce(element.options, draft => {
                              let idx = element.options.indexOf(e);
                              if (idx > - 1) {
                                draft.splice(idx + 1, 0, { ...e, id: generate() })
                              }
                            })

                            handleElementChange('options', options);

                          }}
                          onRemoveHandler={(e: EVALUATION.SelectOptions) => {
                            const newElement = produce(element, draft => {
                              draft.options = produce(element.options, draft => {
                                return draft.filter(item => item.id !== e.id);
                              })

                              if (element.response) {
                                if (element.response.id === e.id) {
                                  draft.response = undefined;
                                }
                              }
                            })

                            setElement(newElement);
                            setIsUpdated(true);

                          }}
                          onUpdateHandler={(e: EVALUATION.SelectOptions) => {
                            let options = produce(element.options, draft => {
                              draft[index] = e;
                            })

                            handleElementChange('options', options);
                          }}
                          optionElement={item}
                          onSelectHandler={(e: EVALUATION.SelectOptions) => {
                            handleElementChange('response', e);
                          }}
                        />
                      </div>
                    ))
                  }
                  <button type="button" onClick={() => {
                    let options = produce(element.options, draft => {
                      draft.push({ id: generate(), name: element.id, value: "", ownerId: LoggedUser.userId, createdAt: new Date() })
                    })
                    handleElementChange('options', options);

                  }}>add</button>

                </div>
              </div>
            </div>

          </div>

          <div className="design-select-area-separator" />

          <div className="design-select-config-area">
            <div className="row">
              <div className="col-md-8" style={{ marginTop: '2rem', marginBottom: '2rem', paddingBottom: 10 }}>
                {isSelected ? buttonBar : ''}
              </div>
              <div className="col-md-4">
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
                      handleElementChange('required', e);
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