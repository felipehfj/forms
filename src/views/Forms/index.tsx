import React, { Fragment, useState } from 'react';
import SectionType from '../../components/evaluation/SectionType';
import { generate } from 'shortid';
import LoggedUser from '../../components/general/LoggedUser';
import { EVALUATION } from '../../interfaces/elements';
import produce from 'immer';

// import { Container } from './styles';

const Forms: React.FC = () => {
  const [sections, setSections] = useState<Array<EVALUATION.SectionElement>>([
    // {
    //   createdAt: new Date(),
    //   formElements: [
    //     {
    //       createdAt: new Date(),
    //       order: 0,
    //       ownerId: LoggedUser.userId,
    //       required: false,
    //       type: 'multiple',
    //       id: generate(),
    //       options: [
    //         {
    //           createdAt: new Date(),
    //           id: 'aabbccddee',
    //           ownerId: LoggedUser.userId,
    //           name: 'sample',
    //           value: 'sample',
    //           checked: true
    //         }
    //       ],
    //       title: '',
    //       response: [
    //         {
    //           createdAt: new Date(),
    //           id: 'aabbccddee',
    //           ownerId: LoggedUser.userId,
    //           name: 'sample',
    //           value: 'sample',
    //           checked: true
    //         }
    //       ]
    //     }
    //   ],
    //   id: generate(),
    //   order: 0,
    //   ownerId: LoggedUser.userId,
    //   title: "",
    //   type: 'section'
    // }
  ]);

  const update = (e: EVALUATION.SectionElement) => {
    setSections(section => produce(section, draft => {
      let foundElement = draft.filter(i => i.id === e.id);
      if (foundElement) {
        let sectionIdx = draft.indexOf(foundElement[0]);
        if (sectionIdx > -1) {
          draft[sectionIdx] = e;
        }
      }
    }));
  }

  const addSection = () => {
    setSections(section => produce(section, draft => {
      draft.push({ createdAt: new Date(), formElements: [], id: generate(), order: 0, ownerId: LoggedUser.userId, title: "", type: 'section' })
    }))
  }

  return (
    <Fragment>
      <button type="button" onClick={addSection}>Add Section</button>
      {sections.map((item, index) => {
        return (<div key={index}>

          <SectionType
            sectionElement={item}
            onAlterOrderHandler={(e: EVALUATION.SectionElement, type: "up"|"down") => {              
              let idx = sections.indexOf(e);
              console.log(idx)
              if (idx > -1) {
                if (type === 'up') {
                  if (idx === 0) {
                    return;
                  } else {
                    let anterior = sections[idx - 1];
                    setSections(sections => produce(sections, draft => {
                      draft[idx - 1] = e;
                      draft[idx] = anterior;
                    }))
                  }
                }

                if (type === 'down') {
                  if (idx === sections.length - 1) {
                    return;
                  } else {
                    let posterior = sections[idx + 1];
                    setSections(sections => produce(sections, draft => {
                      draft[idx + 1] = e;
                      draft[idx] = posterior;
                    }))
                  }
                }
              }

            }}
            onCopyHandler={(e:EVALUATION.SectionElement, index: number) => {
              console.log(e, index);              
             }}
            onRemoveHandler={(e:EVALUATION.SectionElement) => {
              console.log(e);
              setSections(sections => sections.filter(i => i.id!==e.id))
             }}
            onUpdateHandler={update}
            index={index}
          />

        </div>)
      })}

      <pre>
        {JSON.stringify(sections, null, 2)}
      </pre>

    </Fragment>
  );
}

export default Forms;