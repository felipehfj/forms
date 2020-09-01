interface IOption{
  id: string,
  name: string,
  value: string,
}

interface SelectOptions extends IOption {
}

interface MultipleOptions extends IOption {
}

interface IElement {
  id: string,
  order: number,
  type: "text" | "paragraph" | "date" | "email" | "number" | "select" | "multiple",
  title: string,
  subtitle?: string,
  imagePath?: string,
  required: boolean,
  response?: string,
  options?:Array<MultipleOptions|SelectOptions>
}

export declare namespace EVALUATION {
  interface TextElement extends IElement {
    type: "text"
  }

  interface NumberElement extends IElement {
    type: "number"
  }

  interface EmailElement extends IElement {
    type: "email"
  }

  interface DateElement extends IElement {
    type: "date"
  } 

  interface ParagraphElement extends IElement {
    type: "paragraph",
  }

  interface SelectElement extends IElement {
    type: "select",
    options: Array<SelectOptions>,
  }

  interface MultipleElement extends IElement {
    type: "multiple",
    options: Array<MultipleOptions>,
  }
  
  interface SelectOptions extends IOption {
  }
  
  interface MultipleOptions extends IOption {
  }
  
}

