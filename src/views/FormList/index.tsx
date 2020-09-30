import React, { FC, Fragment, useEffect, useState } from 'react';
import api from '../../services/api';
import { EVALUATION } from '../../interfaces/elements';

import './styles.css';
import FormUnit from './FormUnit';

const FormList: FC = () => {
    const [forms, setForms] = useState<Array<EVALUATION.Form>>([]);

    useEffect(() => {
        api.get('/forms')
            .then(response => {
                setForms(forms => response.data)
            })
    },
        [])
    return (
        <Fragment>
            <div className="container">
                <div className="row">

                    {
                        forms.map(item =>
                            <div key={item.id} className="col-xs-6 col-md-3">
                                <FormUnit

                                    form={item}
                                />
                            </div>
                        )
                    }

                </div>
            </div>
        </Fragment>
    );
}

export default FormList;