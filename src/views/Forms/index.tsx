import React, { Fragment, useState } from 'react';
import SectionType from '../../components/evaluation/SectionType';
import { generate } from 'shortid';
import LoggedUser from '../../components/general/LoggedUser';
import { EVALUATION } from '../../interfaces/elements';
import produce from 'immer';

// import { Container } from './styles';

const Forms: React.FC = () => {
  const [sections, setSections] = useState<Array<EVALUATION.SectionElement>>([{ createdAt: new Date(), formElements: [{createdAt: new Date(), order:0, ownerId: LoggedUser.userId, required: false, type:'multiple', id: generate(), options: [{createdAt: new Date(), id: generate(), ownerId:LoggedUser.userId, name:'s', value:'s'}], title: '', response:[]}], id: generate(), order: 0, ownerId: LoggedUser.userId, title: "", type: 'section' }]);

  const update = (e: EVALUATION.SectionElement) => {
    setSections(section => produce(section, draft => {
      let foundElement = draft.find(i => i.id === e.id);
      if (foundElement) {
        let sectionIdx = draft.indexOf(foundElement);
        if (sectionIdx > -1) {
          draft[sectionIdx] = e;
        }
      }
    }));
  }

  const addSection = () => {
    setSections(section => produce(section, draft=>{
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
            onAlterOrderHandler={() => { }}
            onCopyHandler={() => { }}
            onRemoveHandler={() => { }}
            onUpdateHandler={update}
            index={index}
          />

        </div>)
      })}

      {JSON.stringify(sections, null, 2)}
    </Fragment>
  );
}

export default Forms;