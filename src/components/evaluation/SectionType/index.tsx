
import React, { FC, Fragment, useState, useEffect, useRef } from "react";
import { generate } from "shortid";
import { produce } from "immer";
import { EVALUATION } from '../../../interfaces/elements';
import TextType from "../../../components/evaluation/TextType";
import ParagraphType from "../../../components/evaluation/ParagraphType";
import NumberType from "../../../components/evaluation/NumberType";
import EmailType from "../../../components/evaluation/EmailType";
import DateType from "../../../components/evaluation/DateType";
import MultipleType from "../../../components/evaluation/MultipleType";
import SelectType from "../../../components/evaluation/SelectType";
import LoggedUser from '../../../components/general/LoggedUser';
import ElementButtonBar from "../../../components/general/ElementButtonBar";
import SectionButtonBar from "../../general/SectionButtonBar";
import {Collapse} from 'react-collapse';
import Editable from '../../general/Editable';
import StringUtils from '../../../utils/StringUtils';
import './styles.css';

interface SectionTypeProps {
  sectionElement: EVALUATION.SectionElement,
  onRemoveHandler: Function,
  onUpdateHandler: Function,
  onCopyHandler: Function,
  onAlterOrderHandler: Function,
  onAddSection:Function,
  index: number,
}

const SectionType: FC<SectionTypeProps> = ({ sectionElement, onAlterOrderHandler, onCopyHandler, onRemoveHandler, onUpdateHandler,onAddSection, index }) => {
  const [section, setSection] = useState<EVALUATION.SectionElement>(sectionElement);
  const [elements, setElements] = useState<Array<EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement>>(sectionElement.formElements);
  const titleInputRef = useRef<HTMLTextAreaElement>(null);
  const subtitleInputRef = useRef<HTMLTextAreaElement>(null);
  const [isOpened, setIsOpened] = useState(true);
  useEffect(() => {
    setSection(section => produce(section, draft => {
      draft = sectionElement;
    }))
  }, [sectionElement])

  useEffect(() => {
    setSection(section => produce(section, draft => {
      draft.formElements = elements;
    }))
    onUpdateHandler(section);
  }, [elements]);

  useEffect(()=>{setSection({...section, order: index})},[index])

  useEffect(() => {
    onUpdateHandler(section)
  }, [section])

  const addElement = (type: string, index: number) => {
    let orderCount = elements.length;
    switch (type) {
      case "text":
        setElements(elements =>
          produce(elements, draft => {
            if (index >= 0) {
              draft.splice(index + 1, 0, {
                id: generate(),
                order: orderCount,
                required: true,
                title: "",
                type: "text",
                imagePath: "",
                response: "",
                subtitle: "",
                createdAt: new Date(),
                ownerId: LoggedUser.userId,
              });
            } else {
              draft.push({
                id: generate(),
                order: orderCount,
                required: true,
                title: "",
                type: "text",
                imagePath: "",
                response: "",
                subtitle: "",
                createdAt: new Date(),
                ownerId: LoggedUser.userId,
              });
            }
          }));
        break;
      case "number":
        setElements(elements =>
          produce(elements, draft => {
            draft.push({
              id: generate(),
              order: orderCount,
              required: true,
              title: "",
              type: "number",
              imagePath: "",
              response: "",
              subtitle: "",
              createdAt: new Date(),
              ownerId: LoggedUser.userId
            });
          }));
        break;
      case "email":
        setElements(elements =>
          produce(elements, draft => {
            draft.push({
              id: generate(),
              order: orderCount,
              required: true,
              title: "",
              type: "email",
              imagePath: "",
              response: "",
              subtitle: "",
              createdAt: new Date(),
              ownerId: LoggedUser.userId,
            });
          }));
        break;
      case "paragraph":
        setElements(elements =>
          produce(elements, draft => {
            draft.push({
              id: generate(),
              order: orderCount,
              required: true,
              title: "",
              type: "paragraph",
              imagePath: "",
              response: "",
              subtitle: "",
              createdAt: new Date(),
              ownerId: LoggedUser.userId,
            });
          }));
        break;
      case "date":
        setElements(elements =>
          produce(elements, draft => {
            draft.push({
              id: generate(),
              order: orderCount,
              required: true,
              title: "",
              type: "date",
              imagePath: "",
              response: "",
              subtitle: "",
              createdAt: new Date(),
              ownerId: LoggedUser.userId,
            });
          }));
        break;
      case "select":
        setElements(elements =>
          produce(elements, draft => {
            let id = generate()
            draft.push({
              id: id,
              order: orderCount,
              required: true,
              title: "",
              type: "select",
              imagePath: "",
              response: undefined,
              subtitle: "",
              options: [
                { id: generate(), name: id, value: '', ownerId: LoggedUser.userId, createdAt: new Date() },
                { id: generate(), name: id, value: "Outros", ownerId: LoggedUser.userId, createdAt: new Date() },
              ],
              createdAt: new Date(),
              ownerId: LoggedUser.userId,
            });
          }));
        break;
      case "multiple":
        setElements(elements =>
          produce(elements, draft => {
            let id1 = generate();
            let id2 = generate();
            draft.push({
              id: generate(),
              order: orderCount,
              required: true,
              title: "",
              type: "multiple",
              imagePath: "",
              response: [],
              subtitle: "",
              options: [
                { id: id1, name: id1, value: '', ownerId: LoggedUser.userId, createdAt: new Date(), checked: false },
                { id: id2, name: id2, value: "Outros", ownerId: LoggedUser.userId, createdAt: new Date(), checked: false },
              ],
              createdAt: new Date(),
              ownerId: LoggedUser.userId,
            });
          }));
        break;
      default:
        break;
    }
  };

  const handleRemove = (element: EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement) => {
    setElements(currentElement =>
      currentElement.filter(x => x.id !== element.id)
    );
  };

  function handleUpdate(e: EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement) {
    let atual = elements.find(c => c.id === e.id);
    if (atual) {
      let idxAtual = elements.indexOf(atual);
      setElements(elements => produce(elements, v => {
        v[idxAtual] = e;
      }))
    }
  }

  function handleAlterOrder(e: EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement, type: "up" | "down") {
    let idx = elements.indexOf(e);

    if (idx > -1) {
      if (type === 'up') {
        if (idx === 0) {
          return;
        } else {
          let anterior = elements[idx - 1];
          setElements(elements => produce(elements, draft => {
            draft[idx - 1] = e;
            draft[idx] = anterior;
          }))
        }
      }

      if (type === 'down') {
        if (idx === elements.length - 1) {
          return;
        } else {
          let posterior = elements[idx + 1];
          setElements(elements => produce(elements, draft => {
            draft[idx + 1] = e;
            draft[idx] = posterior;
          }))
        }
      }
    }
  }

  function handleCopy(e: EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement) {
    let idx = elements.indexOf(e);

    if (idx > -1) {
      setElements(elements => produce(elements, draft => {
        let genId = generate();
        if (e.options) {

          if (e.type === 'select') {
            let optSelect: Array<EVALUATION.SelectOptions> = [];
            e.options.forEach(item => optSelect.push({ ...item, name: genId, ownerId: LoggedUser.userId, createdAt: new Date() }));
            draft.splice(idx, 0, { ...e, id: genId, imagePath: '', options: optSelect, createdAt: new Date() });
          }

          if (e.type === 'multiple') {
            let optMultiple: Array<EVALUATION.MultipleOptions> = [];
            e.options.forEach(item => optMultiple.push({ ...item, ownerId: LoggedUser.userId, createdAt: new Date(), checked: false }));
            draft.splice(idx, 0, { ...e, id: genId, imagePath: '', options: optMultiple, createdAt: new Date() });
          }
        } else {
          draft.splice(idx, 0, { ...e, id: genId, imagePath: '', createdAt: new Date() });
        }
      }))
    }
  }

  function selectElement(p: EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement, index: number) {
    switch (p.type) {
      case 'text':
        return (
          <TextType
            textElement={p}
            onRemoveHandler={handleRemove}
            onUpdateHandler={handleUpdate}
            onAlterOrderHandler={handleAlterOrder}
            onCopyHandler={handleCopy}
            index={index}
          />
        );
      case 'number':
        return (
          <NumberType
            numberElement={p}
            onRemoveHandler={handleRemove}
            onUpdateHandler={handleUpdate}
            onAlterOrderHandler={handleAlterOrder}
            onCopyHandler={handleCopy}
            index={index}
          />
        );
      case 'email':
        return (
          <EmailType
            emailElement={p}
            onRemoveHandler={handleRemove}
            onUpdateHandler={handleUpdate}
            onAlterOrderHandler={handleAlterOrder}
            onCopyHandler={handleCopy}
            index={index}
          />
        );
      case 'date':
        return (
          <DateType
            dateElement={p}
            onRemoveHandler={handleRemove}
            onUpdateHandler={handleUpdate}
            onAlterOrderHandler={handleAlterOrder}
            onCopyHandler={handleCopy}
            index={index}
          />
        );
      case 'paragraph':
        return (
          <ParagraphType
            paragraphElement={p}
            onRemoveHandler={handleRemove}
            onUpdateHandler={handleUpdate}
            onAlterOrderHandler={handleAlterOrder}
            onCopyHandler={handleCopy}
            index={index}
          />
        );
      case 'select':
        return (
          <SelectType
            selectElement={p}
            onRemoveHandler={handleRemove}
            onUpdateHandler={handleUpdate}
            onAlterOrderHandler={handleAlterOrder}
            onCopyHandler={handleCopy}
            index={index}
          />
        );
      case 'multiple':
        return (
          <MultipleType
            multipleElement={p}
            onRemoveHandler={handleRemove}
            onUpdateHandler={handleUpdate}
            onAlterOrderHandler={handleAlterOrder}
            onCopyHandler={handleCopy}
            index={index}
          />
        );
      default:
        return null;
    }
  }

  return (
    <Fragment>
      <div className="container">
        <div className="portlet light grey">
          <div className="portlet-title">
            <div className="caption">
              Seção {index+1} {section.title ? StringUtils.truncate(` | ${section.title}`, 50 ) : '' }
            </div>
            <div className="tools">
            
            </div>
            <div className="actions">
              <div className="controller-container">
                <div className="btn-container">                  
                  <SectionButtonBar 
                  element={section}
                  onAlterOrder={(e,a)=>{onAlterOrderHandler(e,a)}}  
                  onCopy={(e:any, i:number)=>{onCopyHandler(e, index)}}  
                  onRemove={(e:any,i:number)=>{onRemoveHandler(e,i)}}  
                  onAdd={()=>onAddSection()}
                  onCollapse={() => setIsOpened(isOpened => !isOpened)}
                  index={index}
                  />
                </div>
              </div>

            </div>
          </div>
          <Collapse isOpened={isOpened}>
          <div className="portlet-body">
            <div className="">
              <div className="">
                <h2>
                  <Editable
                    text={section.title}
                    placeholder="Título da seção"
                    type="textarea"
                    childRef={titleInputRef}
                    title="Clique para editar"
                  >
                    <textarea
                      className="form-control"
                      ref={titleInputRef}
                      name="title"
                      value={section.title}
                      placeholder="Título da seção"
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setSection({ ...section, [name]: value })
                      }} />
                  </Editable>
                </h2>
              </div>
              <div className="">
                <h4>
                  <Editable
                    text={section.subtitle ? section.subtitle : ''}
                    placeholder="Descrição da seção"
                    type="textarea"
                    childRef={subtitleInputRef}
                    title="Clique para editar"
                  >
                    <textarea
                      className="form-control"
                      placeholder="Descrição da seção"
                      ref={subtitleInputRef}
                      name="subtitle"
                      value={section.subtitle}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setSection({ ...section, [name]: value })
                      }} />
                  </Editable>
                </h4>
              </div>
            </div>

            <div className="section-elements-container">
              {
                section.formElements.length > 0 ?
                  section.formElements.map((p, index) => {
                    return (
                      <div key={p.id}>
                        {selectElement(p, index)}
                        <div className="controller-container">
                          <div className="btn-container">
                            <ElementButtonBar addElement={addElement} index={index} />
                          </div>
                        </div>
                      </div>
                    )
                  })
                  :
                  <div className="controller-container">
                    <div className="btn-container">
                      <ElementButtonBar addElement={addElement} index={index} />
                    </div>
                  </div>
              }
            </div>
          </div>
          </Collapse>
        </div>        
      </div>
    </Fragment>
  );
};

export default SectionType;