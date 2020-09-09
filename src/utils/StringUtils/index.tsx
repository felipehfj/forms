
const StringUtils = {
    truncate: (value: string, size: number = 20, tail: string = '...') => {    
        if(value && value.length > size){
            return value.substr(0, size-1).concat(tail);
        }else{
            return value;
        }
    }
}

export default StringUtils;