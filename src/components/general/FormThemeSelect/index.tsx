import React, { Fragment, FC } from 'react';
import FormThemeUnit from './FormThemeUnit';

import './styles.css';
import protruding_squares from '../../../assets/midia/backgrounds/Protruding-Squares.svg'

const FormThemeSelect: FC = () => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-1 col-md-1">
                   <FormThemeUnit image={protruding_squares} />
                </div>     
                <div className="col-sm-1 col-md-1">
                   <FormThemeUnit image={protruding_squares} />
                </div>     
                <div className="col-sm-1 col-md-1">
                   <FormThemeUnit image={protruding_squares} />
                </div>                
            </div>
        </Fragment>
    );
}

export default FormThemeSelect;