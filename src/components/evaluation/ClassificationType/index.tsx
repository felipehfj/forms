import React, { Fragment, FC, useState, useEffect, useRef } from 'react';
import SliderSwitch from '../../general/SliderSwitch';
import ControlElementButtonBar from '../../general/ControlElementButtonBar';
import './styles.css';
import ImageElement from '../../general/ImageElement';
import { EVALUATION } from '../../../interfaces/elements';

import './styles.css';
import ClassificationIcon from './ClassificationIcon';

interface ClassificationTypeProps {
    classificationElement: EVALUATION.ClassificationElement,
    onRemoveHandler: Function,
    onUpdateHandler: Function,
    onCopyHandler: Function,
    onAlterOrderHandler: Function,
    buttonBar?: any,
    index: number,
}

const ClassificationType: FC<ClassificationTypeProps> = ({ classificationElement, onRemoveHandler, onAlterOrderHandler, onCopyHandler, onUpdateHandler, buttonBar, index }) => {
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [isSelected, setSelected] = useState<boolean>(false);
    const node = useRef<HTMLDivElement>(null);

    const [element, setElement] = useState<EVALUATION.ClassificationElement>(classificationElement)

    useEffect(() => {
        if (classificationElement) {
            setElement(emailElement => emailElement);
        }
    }, [classificationElement])

    useEffect(() => {
        setElement({ ...element, order: index })
    }, [index])

    const alterOrder = (element: EVALUATION.ClassificationElement, action: "up" | "down") => {
        onAlterOrderHandler(element, action);
    }

    const copy = (element: EVALUATION.ClassificationElement) => {
        onCopyHandler(element);
    }

    const remove = (element: EVALUATION.ClassificationElement) => {
        onRemoveHandler(element);
    }


    const handleFocusClick = (e: any) => {
        if (node && node.current && node.current.contains(e.target)) {
            setSelected(true);
            return;
        }
        if (isUpdated) {
            onUpdateHandler(element);
            setIsUpdated(false);
        }
        setSelected(false);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleFocusClick);

        return () => {
            document.removeEventListener("mousedown", handleFocusClick)
        }
    })

    const handleElementChange = (name: any, value: any) => {
        setElement({ ...element, [name]: value });
        setIsUpdated(true);
    }


    return (
        <Fragment>
            <div className="portlet light" ref={node} style={isSelected ? { boxShadow: 'inset 0 0 1rem rgba(0,0,0,0.7)' } : {}}>
                <div className="portlet-title">
                    <div className="actions">
                        <div className='design-classification-action-button-group' style={isSelected ? { display: 'inline-block' } : {}}>
                            <ControlElementButtonBar
                                onAlterOrderUp={() => alterOrder(element, "up")}
                                onAlterOrderDown={() => alterOrder(element, "down")}
                                onCopy={() => copy(element)}
                                onRemove={() => remove(element)}
                            />
                        </div>
                    </div>
                </div>
                <div className="portlet-body">

                    <div className="design-classification-title-area">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                <div className="form-group">

                                    <textarea
                                        style={{ width: '100%', marginBottom: 10, resize: 'none' }}
                                        name="title"
                                        value={element.title}
                                        rows={4}
                                        maxLength={4000}
                                        placeholder="Pergunta"
                                        className="form-control"
                                        onChange={e => {
                                            const { name, value } = e.target;
                                            handleElementChange(name, value);
                                        }}
                                    />

                                </div>
                                <div className="form-group">
                                    <textarea
                                        style={{ width: '100%', resize: 'none' }}
                                        name="subtitle"
                                        value={element.subtitle}
                                        rows={4}
                                        maxLength={4000}
                                        className="form-control"
                                        placeholder="Descrição da pergunta"
                                        onChange={e => {
                                            const { name, value } = e.target;
                                            handleElementChange(name, value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                <ImageElement
                                    imgSrc={element.imagePath}
                                    onChange={(e: string) => {
                                        handleElementChange('imagePath', e);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="design-classification-response-area">
                        <div className="row">
                            <div className="col-xs-12" >
                                <div className="form-group">
                                    <ClassificationIcon
                                        designMode={false}
                                        initalState={parseInt(element.response ? element.response : '0')}
                                        quantity={element.icon.quantity}
                                        symbol={element.icon.symbol}
                                        onClick={(e: any) => { handleElementChange('response', e) }}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-3 col-xs-12">
                                <div className="form-group">
                                    <select
                                        className='form-control'
                                        value={element.icon.symbol}
                                        name='icon'
                                        onChange={(e) => {
                                            const { name, value } = e.target;

                                            handleElementChange(name, { ...element.icon, symbol: value });
                                        }} >
                                        <option value='number' >Número </option>
                                        <option value='star' >Estrela </option>
                                        <option value='thumb' >Polegar </option>
                                        <option value='smile' >Smile </option>
                                        <option value='heart' >Coração </option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-3 col-xs-12'>
                                <div className='form-group'>
                                    <select
                                        className='form-control'
                                        value={element.icon.quantity}
                                        name='icon'
                                        onChange={(e) => {
                                            const { name, value } = e.target;

                                            handleElementChange(name, { ...element.icon, quantity: value });
                                        }} >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => <option key={item} value={item} >{item}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className='design-classification-area-separator' />

                    <div className="design-classification-config-area">
                        <div className="row">
                            <div className="col-md-8" style={{ marginTop: '2rem', marginBottom: '2rem', paddingBottom: 10 }}>
                                {isSelected ? buttonBar : ''}
                            </div>
                            <div className="col-md-4">
                                <div className="form-group" style={{ marginTop: '2rem', marginBottom: '2rem', paddingBottom: 10 }}>
                                    <label
                                        className="mt-checkbox"
                                        style={{ marginRight: 10, verticalAlign: "top" }}>
                                        Resposta obrigatória
                    </label>
                                    <SliderSwitch
                                        height={22}
                                        width={50}
                                        name="required"
                                        checked={element.required}
                                        onChange={(e: boolean) => {
                                            handleElementChange('required', e);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ClassificationType;