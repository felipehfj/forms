import React, { Fragment, FC } from 'react';

import './styles.css';

interface FormThemeUnitProps {
    color?: string,
    image?: string,
    title?: string,
    onSelect?: Function,
}

const FormThemeUnit: FC<FormThemeUnitProps> = ({ title = 'Laranja da Persia', color = '#df9a57', image, onSelect }: FormThemeUnitProps) => {
    const handleClick = (e: React.MouseEvent) => {
        if (e) e.preventDefault();
        console.log(e.target);
        if (onSelect) {
            onSelect();
        }
    }

    return (
        <Fragment>
            <div className="theme-unit-container" onClick={(e) => handleClick(e)} style={{ cursor: 'pointer' }}>
                <div className="image-block">
                    {image ?
                        <img
                            src={image}
                            alt={title}
                            title={title}
                        />
                        :
                        <div
                            title={title}
                            style={{ backgroundColor: color }}
                        />
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default FormThemeUnit;