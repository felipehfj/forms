import React, { Fragment, FC, useState, useEffect, useRef } from 'react';
import { produce } from "immer";
import { generate } from 'shortid';
import SliderSwitch from '../../general/SliderSwitch';
import ControlElementButtonBar from '../../general/ControlElementButtonBar';
import ImageElement from '../../general/ImageElement';
import MultipleOptionElement from '../../general/MultipleOptionElement';
import LoggedUser from '../../general/LoggedUser';
import { EVALUATION } from '../../../interfaces/elements';
import './styles.css';

interface MultipleTypeProps {
  multipleElement: EVALUATION.MultipleElement,
  onRemoveHandler: Function,
  onUpdateHandler: Function,
  onCopyHandler: Function,
  onAlterOrderHandler: Function,
  buttonBar?: any,
  index: number,
}

const MultipleType: FC<MultipleTypeProps> = ({ multipleElement, onRemoveHandler, onAlterOrderHandler, onCopyHandler, onUpdateHandler, buttonBar, index }: MultipleTypeProps) => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [isSelected, setSelected] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);

  const [element, setElement] = useState<EVALUATION.MultipleElement>(multipleElement)

  useEffect(() => {
    if (multipleElement) {
      setElement(multipleElement => multipleElement);
    }
  }, [multipleElement])

  useEffect(() => {
    setElement({ ...element, order: index })
  }, [index])

  const alterOrder = (element: EVALUATION.MultipleElement, action: "up" | "down") => {
    if (onAlterOrderHandler) {
      onAlterOrderHandler(element, action);
    }
  }

  const copy = (element: EVALUATION.MultipleElement) => {
    if (onCopyHandler) {
      onCopyHandler(element);
    }
  }

  const remove = (element: EVALUATION.MultipleElement) => {
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
            <div className='design-multiple-action-button-group' style={isSelected ? { display: 'inline-block' } : {}}>
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

          <div className="design-multiple-title-area">
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

          <div className="design-multiple-response-area">
            <div className="row">
              <div className="col-xs-12" >
                <div className="form-group">
                  {
                    element.options.map((item, index) => (
                      <div key={item.id} >
                        <MultipleOptionElement
                          index={index}
                          onAlterOrderHandler={(elementReceived: EVALUATION.MultipleOptions, action: "up" | "down") => {
                            let options = produce(element.options, draft => {
                              let idx = element.options.indexOf(elementReceived);
                              console.log(idx);

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
                          onCopyHandler={(e: EVALUATION.MultipleOptions) => {
                            let options = produce(element.options, draft => {
                              let idx = element.options.indexOf(e);
                              if (idx > - 1) {
                                let id = generate();
                                draft.splice(idx + 1, 0, { ...e, id: id, name: id })
                              }
                            })

                            handleElementChange('options', options);
                          }}
                          onRemoveHandler={(e: EVALUATION.MultipleOptions) => {
                            const newElement = produce(element, draft => {
                              draft.options = produce(element.options, draft1 => {
                                return draft1.filter(item => item.id !== e.id);
                              })

                              draft.response = produce(element.response, draft1 => {
                                return draft1.filter(item => item.id !== e.id)
                              })
                            })

                            setElement(newElement);
                            setIsUpdated(true);
                          }}
                          onUpdateHandler={(e: EVALUATION.MultipleOptions) => {
                            const newElement = produce(element, draft => {
                              draft.options[index] = e
                              draft.response[index] = e
                            })

                            setElement(newElement);
                            setIsUpdated(true);
                          }}
                          optionElement={item}
                        />
                      </div>
                    ))
                  }
                  <button type="button" onClick={() => {
                    let options = produce(element.options, draft => {
                      const id = generate();
                      draft.push({ id: id, name: id, value: "", ownerId: LoggedUser.userId, createdAt: new Date(), checked: false });
                    });

                    handleElementChange('options', options);
                  }}>add</button>

                </div>
              </div>
            </div>

          </div>

          <div className='design-multiple-area-separator' />

          <div className="design-multiple-config-area">
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

export default MultipleType;