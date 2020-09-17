import React, { Fragment } from 'react';
import _ from 'lodash';
import './styles.css';
interface GotoSelectionProps {
    name: string,
    value: string,
    sections: Array<any>,
    setSelection: Function,
    className?: string,
}

const GotoSelection: React.FC<GotoSelectionProps> = ({ name, value, sections, setSelection, className }) => {
    return (
        <Fragment>
            <select
                name={name}
                defaultValue='nextSection'
                value={value}
                className={className}
                onChange={(e) => {
                    const { name, value } = e.target;
                    setSelection({ name, value });
                }}>
                <option value="nextSection" defaultChecked>Próxima seção</option>
                <option value="endForm">Fim do formulário</option>
                <optgroup label="Seções">
                    {sections.map((item, index) => <option key={item.id} value={item.id}>{`Seção ${index + 1}: ${_.truncate(item.title, { length: 30, omission: '...', separator:' ' })}`}</option>)}
                </optgroup>
            </select>
        </Fragment>
    )
}

export default GotoSelection;