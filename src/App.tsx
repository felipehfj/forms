
import React, { useState } from "react";
import { generate } from "shortid";
import TextType from "./components/evaluation/TextType";
import ParagraphType from "./components/evaluation/ParagraphType";
import NumberType from "./components/evaluation/NumberType";
import EmailType from "./components/evaluation/EmailType";
import DateType from "./components/evaluation/DateType";
import { EVALUATION } from './interfaces/elements';
import SelectType from "./components/evaluation/SelectType";
import { produce } from "immer";

const App: React.FC = () => {

  const [orderCount, setOrderCount] = useState(1);
  const [elements, setElements] = useState<Array<EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement>>([
    // { id: generate(), order: 1, type: "text", title: "", subtitle: "", imagePath: "", required: true, response: "" },
    // { id: generate(), order: 2, type: "number", title: "", subtitle: "", imagePath: "", required: true, response: "" },
    // { id: generate(), order: 3, type: "paragraph", title: "", subtitle: "", imagePath: "", required: true, response: "" },
    // { id: generate(), order: 4, type: "email", title: "", subtitle: "", imagePath: "", required: true, response: "" },
    // { id: generate(), order: 5, type: "date", title: "", subtitle: "", imagePath: "", required: true, response: "10/06/1983" },
    // { id: generate(), order: 6, type: "select", title: "", subtitle: "", imagePath: "", required: true, response: "", options: [{ id: generate(), value: 'teste' }] }
  ]);

  const fn = {
    addElement: (type: string) => {
      setOrderCount(order => order + 1);

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
    },
    removeElement: (element: EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement) => {
      setElements(currentElement =>
        currentElement.filter(x => x.id !== element.id)
      );
    },
    orderElement: (element: EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement, type: "up"|"down") =>{ 

    }
  }

  const addElement = (type: string) => {
    setOrderCount(order => order + 1);

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

  const removeElement = (element: EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement) => {
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
    console.log(e);
  }



  return (
    <div style={{ textAlign: "center" }}>

      <button
        onClick={() => addElement('text')}
      >
        text
      </button>
      <button
        onClick={() => addElement('paragraph')}
      >
        paragraph
      </button>
      <button
        onClick={() => addElement('date')}
      >
        date
      </button>
      <button
        onClick={() => addElement('number')}
      >
        number
      </button>
      <button
        onClick={() => addElement('email')}
      >
        email
      </button>
      <button
        onClick={() => addElement('select')}
      >
        select
      </button>

      <div>{JSON.stringify(elements, null, 2)}</div>

      {elements.map((p, index) => {
        switch (p.type) {
          case 'text':
            return (
              <div key={p.id}>
                <TextType
                  textElement={p}
                  remove={() => removeElement(p)}
                  onUpdateHandler={handleUpdate}
                />
              </div>
            );
          case 'number':
            return (
              <div key={p.id}>
                <NumberType
                  numberElement={p}
                  remove={() => removeElement(p)}
                />
              </div>
            );
          case 'email':
            return (
              <div key={p.id}>
                <EmailType
                  emailElement={p}
                  remove={() => removeElement(p)}
                />
              </div>
            );
          case 'date':
            return (
              <div key={p.id}>
                <DateType
                  dateElement={p}
                  remove={() => removeElement(p)}
                />
              </div>
            );
          case 'paragraph':
            return (
              <div key={p.id}>
                <ParagraphType
                  paragraphElement={p}
                  remove={() => removeElement(p)}
                />
              </div>
            );
          case 'select':
            return (
              <div key={p.id}>
                <SelectType
                  selectElement={p}
                  remove={() => removeElement(p)}
                  onUpdateHandler={handleUpdate}
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
