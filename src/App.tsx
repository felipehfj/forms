
import React, { useState, useEffect } from "react";
import { generate } from "shortid";
import TextType from "./components/evaluation/TextType";
import ParagraphType from "./components/evaluation/ParagraphType";
import NumberType from "./components/evaluation/NumberType";
import EmailType from "./components/evaluation/EmailType";
import DateType from "./components/evaluation/DateType";
import { EVALUATION } from './interfaces/elements';
import SelectType from "./components/evaluation/SelectType";
import { produce } from "immer";
import ElementButtonBar from "./components/general/ElementButtonBar";

const App: React.FC = () => {  
  const [elements, setElements] = useState<Array<EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement>>([]);


  const addElement = (type: string) => {    
    const orderCount = elements.length+1;
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
              subtitle: ""
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
              subtitle: ""
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
              subtitle: ""
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
              subtitle: ""
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
              subtitle: ""
            });
          }));
        break;
      case "select":
        setElements(elements =>
          produce(elements, draft => {
            draft.push({
              id: generate(),
              order: orderCount,
              required: true,
              title: "",
              type: "select",
              imagePath: "",
              response: "",
              subtitle: "",
              options: []
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
        draft.splice(idx, 0, { ...e, id: generate(), imagePath: '' });
      }))
    }
  }

  return (
    <div style={{ textAlign: "center" }}>

      <ElementButtonBar addElement={addElement} />

      <div>{JSON.stringify(elements, null, 2)}</div>

      {elements.map((p, index) => {
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
                />
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
                />
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
                />
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
                />
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
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default App;
