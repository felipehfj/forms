import React, { Fragment } from 'react';
import SectionType from '../../components/evaluation/SectionType';
import { generate } from 'shortid';
import LoggedUser from '../../components/general/LoggedUser';

// import { Container } from './styles';

const Forms: React.FC = () => {
  return (
    <Fragment>
      <SectionType
        sectionElement={{createdAt:new Date(),formElements:[], id:generate(), order:0, ownerId: LoggedUser.userId, title:"",type:'section' }}
        onAlterOrderHandler={() =>{}}
        onCopyHandler={() =>{}}
        onRemoveHandler={() =>{}}
        onUpdateHandler={() =>{}}
        index={1}
      />
    </Fragment>
  );
}

export default Forms;