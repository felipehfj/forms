import React, { Fragment, useState } from 'react';
import SectionType from '../../components/evaluation/SectionType';
import { generate } from 'shortid';
import LoggedUser from '../../components/general/LoggedUser';
import { EVALUATION } from '../../interfaces/elements';
import { FaPalette, FaEllipsisH, FaSave } from 'react-icons/fa';
import produce from 'immer';
import Modal from 'react-modal';

import './styles.css';


const modalThemeStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '80vw',
    minHeight: '200px'
  }
};


const Forms: React.FC = () => {
  const [form, setForm] = useState<EVALUATION.Form>(
    {
      createdAt: new Date(),
      id: generate(),
      isPublic: false,
      ownerId: LoggedUser.userId,
      sections: [{
        createdAt: new Date(),
        formElements: [],
        id: generate(),
        order: 0,
        ownerId: LoggedUser.userId,
        title: "",
        type: 'section'
      }],
      status: 'elaboration',
      theme: 'red',
      tipo: "survey",
    });

  const update = (e: EVALUATION.SectionElement) => {
    setForm(form => produce(form, draft => {
      let foundElement = draft.sections.filter(i => i.id === e.id);
      if (foundElement) {
        let sectionIdx = draft.sections.indexOf(foundElement[0]);
        if (sectionIdx > -1) {
          draft.sections[sectionIdx] = e;
        }
      }
    }));
  }

  const addSection = () => {
    setForm(form => produce(form, draft => {
      draft.sections.push({ createdAt: new Date(), formElements: [], id: generate(), order: 0, ownerId: LoggedUser.userId, title: "", type: 'section' })
    }))
  }

  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(show => true)
  }

  const closeModal = () => {
    setShow(show => false)
  }


  return (
    <Fragment>
      <div className="configuration-container">
        <div className="button-bar">
          <button type='button' className="btn btn-icon" onClick={() => showModal()}><FaPalette /> Temas</button>
          <button type='button' className="btn btn-icon"><FaSave /> Salvar</button>
          <button type='button' className="btn btn-icon"><FaEllipsisH /></button>
        </div>
      </div>

      <div style={{ backgroundColor: form.theme, width: '100%', height: 'calc(100vh - 40px)', overflowX: 'auto', paddingTop: 20 }} >
        {form.sections.map((item, index) => {
          return (<div key={item.id}>

            <SectionType
              sectionElement={item}
              onAlterOrderHandler={(e: EVALUATION.SectionElement, type: "up" | "down") => {
                let idx = form.sections.indexOf(e);
                console.log(idx)
                if (idx > -1) {
                  if (type === 'up') {
                    if (idx === 0) {
                      return;
                    } else {
                      let anterior = form.sections[idx - 1];
                      setForm(form => produce(form, draft => {
                        draft.sections[idx - 1] = e;
                        draft.sections[idx] = anterior;
                      }))
                    }
                  }

                  if (type === 'down') {
                    if (idx === form.sections.length - 1) {
                      return;
                    } else {
                      let posterior = form.sections[idx + 1];
                      setForm(form => produce(form, draft => {
                        draft.sections[idx + 1] = e;
                        draft.sections[idx] = posterior;
                      }))
                    }
                  }
                }

              }}
              onCopyHandler={(e: EVALUATION.SectionElement, index: number) => {
                let ret = produce(e, draft => {
                  let el = draft;
                  let now = new Date();
                  let owner = LoggedUser.userId;
                  let sectionId = generate();

                  el.createdAt = now;
                  el.ownerId = owner;
                  el.id = sectionId;

                  el.formElements.forEach(item => {
                    let itemId = generate();

                    item.id = itemId;
                    item.createdAt = now;
                    item.ownerId = owner;
                    item.options?.forEach(option => {
                      option.createdAt = now;
                      option.ownerId = owner;
                      option.id = generate();
                      if (item.type === 'select') {
                        option.name = itemId;
                      }
                    })
                    if (item.type === 'multiple') {
                      item.response = item.options;
                    }
                  })
                })

                setForm(form => produce(form, draft => {
                  draft.sections.splice(index + 1, 0, ret);
                }))
              }}
              onRemoveHandler={(e: EVALUATION.SectionElement) => {
                if (form.sections.length > 1) {
                  setForm(form => produce(form, draft => {
                    draft.sections = draft.sections.filter(i => i.id !== e.id)
                  }))
                }
                else {
                  alert('Deve haver pelo menos uma seção');
                }
              }}
              onUpdateHandler={update}
              onAddSection={addSection}
              index={index}
            />

          </div>)
        })}
      </div>
      {/* <pre>
        {JSON.stringify(sections, null, 2)}
      </pre> */}

      <Modal
        isOpen={show}
        //onAfterOpen={afterOpenModal}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={modalThemeStyles}
        contentLabel="Example Modal"
      >
        <div>
          <button type="button" className="btn btn-secondary" onClick={() => {setForm(form => produce(form, draft=>{draft.theme='red'})) }}>Vermelho</button>
          <button type="button" className="btn btn-secondary" onClick={() => {setForm(form => produce(form, draft=>{draft.theme='blue'})) }}>Azul</button>
          <button type="button" className="btn btn-secondary" onClick={() => {setForm(form => produce(form, draft=>{draft.theme='green'})) }}>Verde</button>
        </div>
        <button type="button" className="btn btn-secondary" style={{ width: "100%" }} onClick={closeModal}>ok</button>
      </Modal>
      {/* <pre>
        {JSON.stringify(form, null, 2)}
      </pre> */}
    </Fragment>
  );
}

export default Forms;