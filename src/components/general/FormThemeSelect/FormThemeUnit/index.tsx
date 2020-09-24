import React, { Fragment, FC } from 'react';

import './styles.css';

interface FormThemeUnitProps {
    type?: 'solid' | 'image',
    color?: string,
    image?: string,
    title?: string,
    description?: string,
    onSelect?: Function,
}

const FormThemeUnit: FC<FormThemeUnitProps> = ({ type = 'solid', title = 'Laranja da Persia', description, color = '#df9a57', image, onSelect }: FormThemeUnitProps) => {
    const handleClick = (e: React.MouseEvent) => {
        if (e) e.preventDefault();
        console.log(e.target);
        if (onSelect) {
            onSelect();
        }
    }

    return (
        <Fragment>
            <div className="thumbnail" onClick={(e) => handleClick(e)} style={{ cursor: 'pointer' }}>
                {type === 'image' ?
                    <img
                        src={image}
                        alt="100%x200"
                        style={{ width: '100%', height: '200px', display: 'block' }}
                    />
                    :
                    <div
                        style={{ width: '100%', height: '100px', display: 'block', backgroundColor: color }}
                    />
                }

                <div className="caption">
                    <p>{title}</p>
                    <p>{description} </p>
                </div>
            </div>
        </Fragment>
    );
}

export default FormThemeUnit;