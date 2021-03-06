interface IOption {
  id: string,
  name: string,
  value: string,
  ownerId: string,
  createdAt: Date,
}

interface SelectOptions extends IOption {
  navigation?: string,
}

interface MultipleOptions extends IOption {
  checked: boolean,
}

interface IBaseElement {
  id: string,
  type: "text" | "paragraph" | "date" | "email" | "number" | "select" | "multiple" | "section" | "classification",
  order: number,
  title: string,
  subtitle?: string,
  imagePath?: string,
  ownerId: string,
  createdAt: Date,
}

interface IElement extends IBaseElement {
  id: string,
  order: number,
  type: "text" | "paragraph" | "date" | "email" | "number" | "select" | "multiple" | "classification",
  title: string,
  subtitle?: string,
  imagePath?: string,
  required: boolean,
  response?: string | number | SelectOptions | Array<MultipleOptions>,
  options?: Array<MultipleOptions | SelectOptions>,
}

export declare namespace EVALUATION {
  interface TextElement extends IElement {
    type: "text",
    response?: string,
  }

  interface NumberElement extends IElement {
    type: "number",
    response?: string | number,
  }

  interface EmailElement extends IElement {
    type: "email",
    response?: string,
  }

  interface ClassificationElement extends IElement {
    type: "classification",
    response?: string,
    icon: {
      symbol: 'star' | 'number' | 'thumb' | 'heart' | 'smile',
      quantity: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    }
  }

  interface DateElement extends IElement {
    type: "date",
    response?: string,
  }

  interface ParagraphElement extends IElement {
    type: "paragraph",
    response?: string,
  }

  interface SelectElement extends IElement {
    type: "select",
    options: Array<SelectOptions>,
    response?: SelectOptions,
    navigation: string,
  }

  interface MultipleElement extends IElement {
    type: "multiple",
    options: Array<MultipleOptions>,
    response: Array<MultipleOptions>,
  }

  interface SectionElement extends IBaseElement {
    formElements: Array<EVALUATION.TextElement | EVALUATION.ParagraphElement | EVALUATION.NumberElement | EVALUATION.DateElement | EVALUATION.EmailElement | EVALUATION.SelectElement | EVALUATION.MultipleElement | EVALUATION.ClassificationElement>,
    navigation: string,    
  }

  interface SelectOptions extends IOption {
    navigation: string,
  }

  interface MultipleOptions extends IOption {
    checked: boolean,
  }

  interface FormThemeProps {
    id: string,
    primaryColor: string,
    secondaryColor: string,
    image: string,
    title: string,
    onSelect?: Function,
  } 

  interface Form {
    id: string,
    ownerId: string,
    tipo: "survey" | "evaluation",
    theme: FormThemeProps,
    status: 'elaboration' | 'active' | 'inactive',
    startAt?: Date,
    endAt?: Date,
    sections: Array<SectionElement>,
    thanksMessage?: string,
    createdAt: Date,
    isPublic: boolean,
  }
}


