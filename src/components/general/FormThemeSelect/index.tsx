import React, { Fragment, FC } from 'react';
import FormThemeUnit from './FormThemeUnit';

import './styles.css';
import protruding_squares from '../../../assets/midia/backgrounds/Protruding-Squares.svg'

const FormThemeSelect: FC = () => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-2 col-md-2">
                   <FormThemeUnit type='image' image={protruding_squares} />
                </div>                
            </div>
        </Fragment>
    );
}

export default FormThemeSelect;