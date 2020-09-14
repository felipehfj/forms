import React, { Fragment, FC, useState, useEffect, useRef } from 'react';
import SliderSwitch from '../../general/SliderSwitch';
import ControlElementButtonBar from '../../general/ControlElementButtonBar';
import './styles.css';
import ImageElement from '../../general/ImageElement';
import { EVALUATION } from '../../../interfaces/elements';

interface ParagraphTypeProps {
  paragraphElement: EVALUATION.ParagraphElement,
  onRemoveHandler: Function,
  onUpdateHandler: Function,
  onCopyHandler: Function,
  onAlterOrderHandler: Function,
  buttonBar?: any,
  index: number
}

const TextType: FC<ParagraphTypeProps> = ({ paragraphElement, onRemoveHandler, onAlterOrderHandler, onCopyHandler, onUpdateHandler, buttonBar, index }: ParagraphTypeProps) => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [isSelected, setSelected] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);

  const [element, setElement] = useState<EVALUATION.ParagraphElement>(paragraphElement)

  useEffect(() => {
    if (paragraphElement) {
      setElement(paragraphElement => paragraphElement);
    }
  }, [paragraphElement])

  useEffect(() => {
    setElement({ ...element, order: index });
  }, [index])


  const alterOrder = (element: EVALUATION.ParagraphElement, action: "up" | "down") => {
    onAlterOrderHandler(element, action);
  }

  const copy = (element: EVALUATION.ParagraphElement) => {
    onCopyHandler(element);
  }

  const remove = (element: EVALUATION.ParagraphElement) => {
    onRemoveHandler(element);
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
            <div className='design-paragraph-action-button-group' style={isSelected ? { display: 'inline-block' } : {}}>
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

          <div className="design-paragraph-title-area">
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

          <div className="design-paragraph-response-area">
            <div className="row">
              <div className="col-xs-12" >
                <div className="form-group">

                  <textarea
                    disabled
                    style={{ width: '100%', resize: 'none', padding: '2rem' }}
                    name="response"
                    value={element.response}
                    maxLength={4000}
                    className="form-control"
                    placeholder="Insira a sua resposta"
                    onChange={e => {
                      const { name, value } = e.target;
                      handleElementChange(name, value);
                    }}
                  />

                </div>
              </div>
            </div>

          </div>

          <div className='design-paragraph-area-separator' />

          <div className="design-paragraph-config-area">
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

export default TextType;