
import React, { FC, useState } from "react";
import { generate } from "shortid";
import TextType from "./components/evaluation/TextType";
import ParagraphType from "./components/evaluation/ParagraphType";
import NumberType from "./components/evaluation/NumberType";
import EmailType from "./components/evaluation/EmailType";
import DateType from "./components/evaluation/DateType";
import MultipleType from "./components/evaluation/MultipleType";
import SelectType from "./components/evaluation/SelectType";

import { EVALUATION } from './interfaces/elements';

import { produce } from "immer";
import ElementButtonBar from "./components/general/ElementButtonBar";

const App: FC = () => {
  const [elements, setElements] = useState<Array<EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement>>([
    // { id: 'aabbccddee', order: 0, type: 'select', options: [{ id: generate(), name: 'aabbccddee', value: 'teste' }], title: 'Seleção', required: false }
  ]);


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
            let id=generate()
            draft.push({
              id: id,
              order: orderCount,
              required: true,
              title: "",
              type: "select",
              imagePath: "",
              response: undefined,
              subtitle: "",
              options: [{id:generate(), name:id, value:''},{id:generate(), name:id, value:"Outros"}]
            });
          }));
        break;
        case "multiple":
        setElements(elements =>
          produce(elements, draft => {
            let id1=generate();
            let id2=generate();
            draft.push({
              id: generate(),
              order: orderCount,
              required: true,
              title: "",
              type: "multiple",
              imagePath: "",
              response: [],
              subtitle: "",
              options: [{id:id1,name:id1, value:''},{id:id2,name:id2, value:"Outros"}]
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
        if(e.options){
          let opt: Array<EVALUATION.MultipleOptions|EVALUATION.SelectOptions> = [];
          
          if(e.type==='select'){
            e.options.every(item => opt.push({...item, name: genId}));
          }          
          
          draft.splice(idx, 0, { ...e, id: genId, imagePath: '', options: opt });
        }else{
          draft.splice(idx, 0, { ...e, id: genId, imagePath: ''});
        }        
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
                  index={index}
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
                  index={index}
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
                  index={index}
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
                  index={index}
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
                  index={index}
                />
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
