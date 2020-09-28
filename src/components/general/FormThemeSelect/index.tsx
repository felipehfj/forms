import React, { Fragment, FC } from 'react';
import FormThemeUnit from './FormThemeUnit';

import './styles.css';
import protruding_squares from '../../../assets/midia/backgrounds/Protruding-Squares.svg'
import solidBlack from '../../../assets/midia/backgrounds/Solid_black.svg';
import solidBlue from '../../../assets/midia/backgrounds/Solid_blue.svg';
import solidOrange from '../../../assets/midia/backgrounds/Solid_orange.svg';

interface FormThemeSelectProps{
    onSelect:Function,
}

const FormThemeSelect: FC<FormThemeSelectProps> = ({onSelect}) => {    
    const themes = [
        {
            color: '#fff',
            image: solidBlack,
            title: 'Black',
        },
        {
            color: '#00f',
            image: solidBlue,
            title: 'Blue',
        },
        {
            color: '#f90',
            image: solidOrange,
            title: 'Orange Juice',
        },    
        {
            color: '#ee5522',
            image: protruding_squares,
            title: 'Pot Orange Juice',
        },        
    ]

    const handleSelect = (e:any) =>{        
        onSelect(e)
    }
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
                                onSelect={() => handleSelect(theme)}
                            />
                        </div>
                    )
                }
            </div>
        </Fragment>
    );
}

export default FormThemeSelect;