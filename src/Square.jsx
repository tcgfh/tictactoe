import React from "react";
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
    return (
        <div className={className} onClick={props.onClick}>
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
    onClick: PropTypes.func,
    value: PropTypes.string,
    isWinning: PropTypes.bool,
    isClickable: PropTypes.bool,
};
export default Square;