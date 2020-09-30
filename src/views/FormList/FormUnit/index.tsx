import React, { Fragment, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { EVALUATION } from '../../../interfaces/elements';
import './styles.css';
interface FormUnitProps {
    form: EVALUATION.Form
}
const FormUnit: FC<FormUnitProps> = ({ form }) => {
    const BG_THEME_URL = process.env.REACT_APP_BG_THEME_URL;
    const history = useHistory();

    const handleGoToForm = () => {
        history.push(`/forms/${form.id}`);

    }
    return (
        <Fragment>
            <div className="form-unit-container">
                <div className="image-block"
                    style={{ backgroundImage: `url(${BG_THEME_URL}/${form.theme.image})` }}
                    onClick={handleGoToForm}
                />
                <div
                    className="content-block"
                    onClick={handleGoToForm}
                >
                    <h4>{form.sections[0].title}</h4>
                    <p>{form.sections[0].subtitle} </p>
                </div>
                <div
                    className="footer-block"
                    onClick={handleGoToForm}>
                    teste
                </div>
            </div>
        </Fragment>
    );
}

export default FormUnit;