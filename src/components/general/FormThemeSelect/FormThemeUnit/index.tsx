import React, { Fragment, FC } from 'react';

import './styles.css';

interface FormThemeUnitProps {
    primaryColor: string,
    secondaryColor: string,
    image: string,
    title: string,
    onSelect?: Function,
}

const FormThemeUnit: FC<FormThemeUnitProps> = ({ title, primaryColor, secondaryColor, image, onSelect }: FormThemeUnitProps) => {    

    const handleClick = (e: React.MouseEvent) => {
        if (e) e.preventDefault();        
        if (onSelect) {
            onSelect();
        }
    }

    return (
        <Fragment>
            <div
                className="theme-unit-container"
                onClick={(e) => handleClick(e)} style={{ cursor: 'pointer' }}
            >
                <div className="image-block">
                    <div
                    title={title}
                    style={{                         
                        backgroundImage: `url(${image})`, 
                        width: 100, 
                        height: 100 
                    }}
                    />                    
                </div>
            </div>
        </Fragment>
    );
}

export default FormThemeUnit;