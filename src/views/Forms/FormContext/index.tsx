import { createContext } from 'react';
import{EVALUATION} from '../../../interfaces/elements';

interface FormContextProps{
    form: EVALUATION.Form,
    sectionsSummary: Array<{id:string, title: string}>,
}

const FormContext = createContext<Partial<FormContextProps>>({});

export const FormProvider = FormContext.Provider;;
export const FormConsumer = FormContext.Consumer;

export default FormContext;