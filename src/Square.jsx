import React, {useCallback} from "react";
import PropTypes from "prop-types";

import "./Square.css";

function Square (props) {
    let className = "square";
    if (props.isWinning) {
        className = "square square--winning";
    }
    if (props.isClickable) {
        className = "square square--clickable";
    }
    const handleSquareClick = useCallback(()=> props.onClick(props.index), [props.index, props.onClick]);

    return (
        <div className={className} onClick={props.isClickable ? handleSquareClick : undefined}>
            {props.value}
        </div>
    );
}

Square.defaultProps = {
    onClick: ()=>{},
    isWinning: false,
    isClickable: false,
};

Square.propTypes = {
    index: PropTypes.number,
    onClick: PropTypes.func,
    value: PropTypes.string,
    isWinning: PropTypes.bool,
    isClickable: PropTypes.bool,
};
export default Square;