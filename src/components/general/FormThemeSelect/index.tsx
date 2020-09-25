import React, { Fragment, FC } from 'react';
import FormThemeUnit from './FormThemeUnit';

import './styles.css';
import protruding_squares from '../../../assets/midia/backgrounds/Protruding-Squares.svg'



const FormThemeSelect: FC = () => {

    const themes = [
        {
            color: '#89023e',
            image: undefined,
            title: 'Claret',
        },
        {
            color: '#ffd9da',
            image: undefined,
            title: 'Pale Pink',
        },
        {
            color: '#9ea3b0',
            image: undefined,
            title: 'Manatee',
        },
        {
            color: '#e4c3ad',
            image: undefined,
            title: 'Desert Sand',
        },
        {
            color: '#9ea3b0',
            image: undefined,
            title: 'Manatee',
        },
        {
            color: '#9ea3b0',
            image: undefined,
            title: 'Manatee',
        },
        {
            color: '#9ea3b0',
            image: undefined,
            title: 'Manatee',
        },
    ]
    return (
        <Fragment>
            <div className="row">
                {
                    themes.map(theme =>
                        <div key={theme.title} className="col-md-2">
                            <FormThemeUnit
                                color={theme.color}
                                image={theme.image}
                                title={theme.title}
                            />
                        </div>
                    )
                }

                <div className="col-md-2">
                    <FormThemeUnit image={protruding_squares} />
                </div>
            </div>
        </Fragment>
    );
}

export default FormThemeSelect;