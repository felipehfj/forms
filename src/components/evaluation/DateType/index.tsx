import React, { Fragment, FC, useState, useEffect, useRef } from 'react';
import SliderSwitch from '../../general/SliderSwitch';
import ControlElementButtonBar from '../../general/ControlElementButtonBar';
import './styles.css';
import ImageElement from '../../general/ImageElement';
import { EVALUATION } from '../../../interfaces/elements';
import DatePicker, { registerLocale } from "react-datepicker";
import br from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import InputMask from "react-input-mask";

import "react-datepicker/dist/react-datepicker.css";

interface DateTypeProps {
  dateElement: EVALUATION.DateElement,
  onRemoveHandler: Function,
  onUpdateHandler: Function,
  onCopyHandler: Function,
  onAlterOrderHandler: Function,
  buttonBar?:any,
  index: number
}


registerLocale('br', br);

const TextType: FC<DateTypeProps> = ({ dateElement, onRemoveHandler, onAlterOrderHandler, onCopyHandler, onUpdateHandler,buttonBar, index }: DateTypeProps) => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [isSelected, setSelected] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);

  const [element, setElement] = useState<EVALUATION.DateElement>(dateElement)

  useEffect(() => {
    if (dateElement) {
      setElement(dateElement => dateElement);
    }
  }, [dateElement])

  useEffect(() => {
    setElement({ ...element, order: index })
  }, [index])

  const alterOrder = (element: EVALUATION.DateElement, action: "up" | "down") => {
    if (onAlterOrderHandler) {
      onAlterOrderHandler(element, action);
    }
  }

  const copy = (element: EVALUATION.DateElement) => {
    if (onCopyHandler) {
      onCopyHandler(element);
    }
  }

  const remove = (element: EVALUATION.DateElement) => {
    if (onRemoveHandler) {
      onRemoveHandler(element);
    }
  }

  function formatDate(date: string) {
    if (typeof date == 'string') {
      let str = date.split('/');
      let d = new Date(`${str[2]}-${str[1]}-${str[0]}T00:00:00`);
      return d;
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
            <div className='design-date-action-button-group' style={isSelected ? { display: 'inline-block' } : {}}>
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

          <div className="design-date-title-area">
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

          <div className="design-date-response-area">
            <div className="row">
              <div className="col-xs-12" >
                <div className="form-group">

                  <DatePicker
                    disabled
                    className="form-control"
                    locale={br}
                    dateFormat="dd/MM/yyyy"
                    name="response"
                    selected={element.response ? formatDate(element.response) : null}
                    customInput={<InputMask mask="99/99/9999" />}
                    onChange={e => {
                      let val = e ? e : '';
                      if (val instanceof Date) {                        
                        handleElementChange('response', format(val, 'dd/MM/yyyy', { locale: br }));
                      } else {
                        handleElementChange('response', '');
                      }
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className='design-date-area-separator' />

          <div className="design-date-config-area">
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