import React, {FC, Fragment} from 'react';

import './styles.css';

const OptionElement: FC = () => {
  return (
      <Fragment>
          <div className="question-choice-container">
            <div className="question-choice-label">
                <div className="question-choice-icon-group">                    
                    <input aria-label="Opção 1" disabled className="design-question-choice-icon" type="radio" />                    
                </div>
            </div>
            <div className="question-choice-option-textbox inline-display">
            <input aria-label="Texto da Opção de Escolha" className="form-control" placeholder="Insira um nome para esta opção." maxLength={1000} />
            </div>
          </div>
      </Fragment>
  );
}

export default OptionElement;