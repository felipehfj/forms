import React, { Fragment, FC, useEffect, useState } from 'react';
import FormThemeUnit from './FormThemeUnit';
import api from '../../../services/api';
import './styles.css';

interface FormThemeSelectProps {
    onSelect: Function,
}

const FormThemeSelect: FC<FormThemeSelectProps> = ({ onSelect }) => {
    const BG_THEME_URL = process.env.REACT_APP_BG_THEME_URL;
    const [themes, setThemes] = useState<Array<any>>();

    useEffect(() => {
        api.get('/themes').then(response => {
            setThemes(response.data)
        })
    }, [])

    const handleSelect = (e: any) => {
        onSelect(e)
    }
    return (
        <Fragment>
            {themes ?
                <div className="row">
                    {
                        themes.map(theme =>
                            <div key={theme.title} className="col-md-1" style={{marginBottom:10}}>
                                <FormThemeUnit
                                    primaryColor={theme.primaryColor}
                                    secondaryColor={theme.secondaryColor}
                                    image={`${BG_THEME_URL}/${theme.image}`}
                                    title={theme.title}
                                    onSelect={() => handleSelect(theme)}
                                />
                            </div>
                        )
                    }
                </div>
                :
                <p>Carregando...</p>
            }

        </Fragment>
    );
}

export default FormThemeSelect;