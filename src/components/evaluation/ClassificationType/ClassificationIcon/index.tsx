import React, { Fragment } from 'react';
import { FaRegStar, FaStar, FaWindowMinimize, FaRegThumbsUp, FaHeart, FaRegHeart, FaRegMeh, FaSmile } from 'react-icons/fa';
import Rating from 'react-rating';
import './styles.css';

interface ClassificationIconProps {
    iconSize?: number,
    symbol: 'star' | 'number' | 'thumb' | 'heart' | 'smile',
    quantity: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    initalState: number,
    onClick?: Function,
    designMode: boolean,
}
const ClassificationIcon: React.FC<ClassificationIconProps> = ({ symbol, quantity, iconSize = 30, initalState, onClick, designMode = true }) => {
    function range(start: number, end: number) {
        let list = [];
        for (let index = start; index <= end; index++) {
            list.push(index);
        }
        return list;
    }

    const emptySymbol = (symbol: string) => {
        switch (symbol) {
            case 'star':
                return <FaRegStar size={iconSize} />;
            case 'thumb':
                return <FaWindowMinimize size={iconSize} />;
            case 'heart':
                return <FaRegHeart size={iconSize} />;
            case 'number':
                return <span className="classification-icon-text">-</span>;
            case 'smile':
                return <FaRegMeh size={iconSize} />;
            default:
                return <FaRegStar size={iconSize} />;
        }
    }

    const fullSymbol = (symbol: string, quantity: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) => {
        switch (symbol) {
            case 'star':
                return <FaStar size={iconSize} />;
            case 'thumb':
                return <FaRegThumbsUp size={iconSize} />;
            case 'heart':
                return <FaHeart size={iconSize} />;
            case 'number':
                return range(1, quantity).map(n => <span key={n} className="classification-icon-text">{n}</span>);
            case 'smile':
                return <FaSmile size={iconSize} />;
            default:
                return <FaStar size={iconSize} />;
        }
    }

    return (
        <Fragment>
            <Rating
                readonly={designMode}
                initialRating={initalState}
                start={0}
                stop={quantity}
                emptySymbol={emptySymbol(symbol)}
                fullSymbol={fullSymbol(symbol, quantity)}
                onClick={(e) => onClick ? onClick(e) : ''}
            />
        </Fragment>
    );
}

export default ClassificationIcon;