import React, { Fragment } from 'react';
import Switch from 'react-switch';

interface SliderSwitchProps{
    height: number,
    width: number,
    name: string,
    checked: boolean,
    onChange: Function
}



const SliderSwitch: React.FC<SliderSwitchProps> = (props: SliderSwitchProps) => {
    return (
        <Fragment>
            <Switch
                height={props.height ? props.height : 22}
                width={props.width ? props.width : 44}                
                name={props.name}
                checked={props.checked}
                onChange={(e) => {
                    props.onChange(e)
                }}
            />
        </Fragment>
    );
}

export default SliderSwitch;