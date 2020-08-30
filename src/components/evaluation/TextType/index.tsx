import React, { Fragment, FC, useState, useEffect } from 'react';
import SliderSwitch from '../../general/SliderSwitch';
import { FaArrowUp, FaArrowDown, FaTrash, FaCopy } from 'react-icons/fa';
import './styles.css';
import ImageElement from '../../general/ImageElement';
import { EVALUATION } from '../../../interfaces/elements';

interface TextTypeProps {
  textElement: EVALUATION.TextElement,
  remove: Function,
  onUpdateHandler: Function
}

const TextType: FC<TextTypeProps> = (props: TextTypeProps) => {
  const [element, setElement] = useState<EVALUATION.TextElement>(props.textElement)

  useEffect(() => {
    if (props.textElement) {
      setElement(textElement => {
        return textElement
      });
    }
  }, [props.textElement])

  useEffect(() => {
    props.onUpdateHandler(element);
  }, [element, props])

  const alterOrder = (id: string, action: "up" | "down") => {
    alert(`alterOrder => id:${id} ,order: ${action}`);
  }

  const copy = (id: string) => {
    alert(`copy => id:${id}`);
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
                  onClick={() => { alterOrder(element.id, "up"); }}
                >
                  <FaArrowUp />
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  title="Mover elemento para uma posição posterior"
                  onClick={() => { alterOrder(element.id, "down"); }}
                >
                  <FaArrowDown />
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  title="Copiar elemento"
                  onClick={() => { copy(element.id); }}
                >
                  <FaCopy />
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  title="Remover elemento"
                  onClick={() => { props.remove(element.id); }}
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
                        setElement({ ...element, [name]: value });
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
                      type="text"
                      style={{ width: '100%', resize: 'none', padding: '2rem' }}
                      name="response"
                      value={element.response}
                      maxLength={100}
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