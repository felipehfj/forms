
import React, { FC, Fragment, useState, useEffect } from "react";
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

import './styles.css';

interface SectionTypeProps {
  sectionElement: EVALUATION.SectionElement,
  onRemoveHandler: Function,
  onUpdateHandler: Function,
  onCopyHandler: Function,
  onAlterOrderHandler: Function,
  index: number,
}

const SectionType: FC<SectionTypeProps> = ({ children, sectionElement, onAlterOrderHandler, onCopyHandler, onRemoveHandler, onUpdateHandler, index }) => {
  const [section, setSection] = useState<EVALUATION.SectionElement>(sectionElement);
  const [elements, setElements] = useState<Array<EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement>>(sectionElement.formElements);

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

  useEffect(() => {
    onUpdateHandler(section)
  }, [section])

  const addElement = (type: string) => {
    let orderCount = elements.length;
    switch (type) {
      case "text":
        setElements(elements =>
          produce(elements, draft => {
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
                { id: id1, name: id1, value: '', ownerId: LoggedUser.userId, createdAt: new Date() },
                { id: id2, name: id2, value: "Outros", ownerId: LoggedUser.userId, createdAt: new Date() },
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
          let opt: Array<EVALUATION.MultipleOptions | EVALUATION.SelectOptions> = [];

          if (e.type === 'select') {
            e.options.forEach(item => opt.push({ ...item, name: genId, ownerId: LoggedUser.userId, createdAt: new Date() }));
          }

          if (e.type === 'multiple') {
            e.options.forEach(item => opt.push({ ...item, ownerId: LoggedUser.userId, createdAt: new Date() }));
          }

          draft.splice(idx, 0, { ...e, id: genId, imagePath: '', options: opt, createdAt: new Date() });
        } else {
          draft.splice(idx, 0, { ...e, id: genId, imagePath: '', createdAt: new Date() });
        }
      }))
    }
  }

  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>

        <div className="portlet light">
          <div className="portlet-title">
            <div className="caption">
              <input
                name="title"
                value={section.title}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setSection({ ...section, [name]: value })
                }} />
            </div>
            <div className="actions">
              <div className="button-group">
              <ElementButtonBar addElement={addElement} />
              </div>
            </div>
          </div>
          <div className="portlet-body">
            <div className="section-elements-container">
              {section.formElements.map((p, index) => {
                switch (p.type) {
                  case 'text':
                    return (
                      <div key={p.id}>
                        <TextType
                          textElement={p}
                          onRemoveHandler={handleRemove}
                          onUpdateHandler={handleUpdate}
                          onAlterOrderHandler={handleAlterOrder}
                          onCopyHandler={handleCopy}
                          index={index}
                        />

                        <ElementButtonBar addElement={addElement} />
                      </div>
                    );
                  case 'number':
                    return (
                      <div key={p.id}>
                        <NumberType
                          numberElement={p}
                          onRemoveHandler={handleRemove}
                          onUpdateHandler={handleUpdate}
                          onAlterOrderHandler={handleAlterOrder}
                          onCopyHandler={handleCopy}
                          index={index}
                        />

                        <ElementButtonBar addElement={addElement} />
                      </div>
                    );
                  case 'email':
                    return (
                      <div key={p.id}>
                        <EmailType
                          emailElement={p}
                          onRemoveHandler={handleRemove}
                          onUpdateHandler={handleUpdate}
                          onAlterOrderHandler={handleAlterOrder}
                          onCopyHandler={handleCopy}
                          index={index}
                        />

                        <ElementButtonBar addElement={addElement} />
                      </div>
                    );
                  case 'date':
                    return (
                      <div key={p.id}>
                        <DateType
                          dateElement={p}
                          onRemoveHandler={handleRemove}
                          onUpdateHandler={handleUpdate}
                          onAlterOrderHandler={handleAlterOrder}
                          onCopyHandler={handleCopy}
                          index={index}
                        />

                        <ElementButtonBar addElement={addElement} />
                      </div>
                    );
                  case 'paragraph':
                    return (
                      <div key={p.id}>
                        <ParagraphType
                          paragraphElement={p}
                          onRemoveHandler={handleRemove}
                          onUpdateHandler={handleUpdate}
                          onAlterOrderHandler={handleAlterOrder}
                          onCopyHandler={handleCopy}
                          index={index}
                        />

                        <ElementButtonBar addElement={addElement} />
                      </div>
                    );
                  case 'select':
                    return (
                      <div key={p.id}>
                        <SelectType
                          selectElement={p}
                          onRemoveHandler={handleRemove}
                          onUpdateHandler={handleUpdate}
                          onAlterOrderHandler={handleAlterOrder}
                          onCopyHandler={handleCopy}
                          index={index}
                        />

                        <ElementButtonBar addElement={addElement} />
                      </div>
                    );
                  case 'multiple':
                    return (
                      <div key={p.id}>
                        <MultipleType
                          multipleElement={p}
                          onRemoveHandler={handleRemove}
                          onUpdateHandler={handleUpdate}
                          onAlterOrderHandler={handleAlterOrder}
                          onCopyHandler={handleCopy}
                          index={index}
                        />

                        <ElementButtonBar addElement={addElement} />
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        </div>

      </div>

      {JSON.stringify(children, null, 2)}
    </Fragment>
  );
};

export default SectionType;