import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import SectionType from '../../components/evaluation/SectionType';
import { generate } from 'shortid';
import LoggedUser from '../../components/general/LoggedUser';
import { EVALUATION } from '../../interfaces/elements';
import { FaPalette, FaEllipsisH, FaSave, FaArrowLeft } from 'react-icons/fa';
import produce from 'immer';
import Modal from 'react-modal';
import api from '../../services/api';
import './styles.css';
import { FormProvider } from '../Forms/FormContext';
import FormThemeSelect from '../../components/general/FormThemeSelect';


const modalThemeStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '80vw',
    height: '300px',
  }
};

interface RouteParams {
  id: string
}

const Forms: React.FC<{}> = () => {
  const { id } = useParams<RouteParams>();
  const params = useParams();
  const BG_THEME_URL = process.env.REACT_APP_BG_THEME_URL;
  const history = useHistory();

  const [form, setForm] = useState<EVALUATION.Form>();
  const [sectionsSummary, setSectionsSummary] = useState<Array<{ id: string, title: string }>>([])
  useEffect(() => {
    api.get(`forms/${id}`)
      .then(response => {
        setForm(response.data)
      })
    console.log(params)
  }, [setForm])

  useEffect(() => {
    if (form) {
      setSectionsSummary(sectionsSummary => produce(sectionsSummary, draft => {
        return getSectionSummary(form)
      }));
    }
  }, [form])

  const update = async (e: EVALUATION.SectionElement) => {
    setForm(form => produce(form, draft => {
      if (draft) {
        let foundElement = draft.sections.filter(i => i.id === e.id);
        if (foundElement) {
          let sectionIdx = draft.sections.indexOf(foundElement[0]);
          if (sectionIdx > -1) {
            draft.sections[sectionIdx] = e;
          }
        }
      }
    })
    );
  }

  const updateRemote = () => {
    api.put(`forms/${id}`, form)
      .then(response => {
        console.log(response);
      });
  }

  const addSection = (index: number) => {
    setForm(form => produce(form, draft => {
      if (draft) {
        draft.sections.push({ createdAt: new Date(), formElements: [], id: generate(), order: 0, ownerId: LoggedUser.userId, title: "", type: 'section', navigation: 'nextSection' })
      }
    }))
  }

  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(show => true)
  }

  const closeModal = () => {
    setShow(show => false)
  }

  const getSectionSummary = (form: EVALUATION.Form) => {
    if (form) {
      const summary = form.sections.map(item => {
        const { id, title } = item;
        return { id, title };
      });

      return summary;
    }
  }



  return (
    <Fragment>
      {form ?
        <div>
          <FormProvider value={{ form, sectionsSummary }}>
            <div className="configuration-container">
              <div className="back-button-bar">
                <button type='button' className="btn btn-icon"  onClick={()=>{ history.push('/formlist')}}><FaArrowLeft color='#000' /> Voltar</button>                
              </div>
              <div className="button-bar">
                <button type='button' className="btn btn-icon" onClick={() => showModal()}><FaPalette /> Temas</button>
                <button type='button' className="btn btn-icon" onClick={() => { updateRemote() }}><FaSave /> Salvar</button>
                <button type='button' className="btn btn-icon"><FaEllipsisH /></button>
              </div>
            </div>

            <div style={{
              // backgroundColor: form.theme.color ? form.theme.color : '', 
              backgroundImage: form.theme.image ? `url(${BG_THEME_URL}/${form.theme.image})` : '',
              width: '100%',
              height: 'calc(100vh - 40px)',
              overflowX: 'auto',
              paddingTop: 20
            }} >

              {form && form.sections ? form.sections.map((item, index) => {
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
                              if (draft) {
                                draft.sections[idx - 1] = e;
                                draft.sections[idx] = anterior;
                              }
                            }))
                          }
                        }

                        if (type === 'down') {
                          if (idx === form.sections.length - 1) {
                            return;
                          } else {
                            let posterior = form.sections[idx + 1];
                            setForm(form => produce(form, draft => {
                              if (draft) {
                                draft.sections[idx + 1] = e;
                                draft.sections[idx] = posterior;
                              }
                            }))
                          }
                        }
                      }

                    }}
                    onCopyHandler={async (e: EVALUATION.SectionElement, index: number) => {
                      let ret = produce(e, draft => {
                        let el = draft;
                        let now = new Date();
                        let owner = LoggedUser.userId;
                        let sectionId = generate();

                        el.createdAt = now;
                        el.ownerId = owner;
                        el.id = sectionId;

                        el.formElements.forEach(async item => {
                          let itemId = generate();
                          item.imagePath = ''
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
                        if (draft) {
                          draft.sections.splice(index + 1, 0, ret);
                        }
                      }))
                    }}
                    onRemoveHandler={(e: EVALUATION.SectionElement) => {
                      if (form.sections.length > 1) {
                        e.formElements.forEach(item => {
                          if (item.imagePath) {
                            try {
                              api.delete(`/image/${item.imagePath}`);
                            } catch (error) {
                              console.log(error)
                            }
                          }
                        })
                        setForm(form => produce(form, draft => {
                          if (draft) {
                            draft.sections = draft.sections.filter(i => i.id !== e.id)
                          }
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
              }) : ''
              }

            </div>
            {/* <pre>
        {JSON.stringify(form, null, 2)}
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
                <FormThemeSelect onSelect={(e: any) => {

                  setForm(form => produce(form, draft => { if (draft) draft.theme = { id: e.id, primaryColor: e.primaryColor, secondaryColor: e.secondaryColor, image: e.image, title: e.title } }))
                }}
                />
              </div>
              <button type="button" className="btn btn-secondary" style={{ width: "100%" }} onClick={closeModal}>ok</button>
            </Modal>
          </FormProvider>
        </div>
        : <div>Carregando</div>}
    </Fragment>
  );
}

export default Forms;