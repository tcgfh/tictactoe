import React from "react";
import PropTypes from "prop-types";

import "./Square.css";

function Square (props) {

    return (
        <div className="square" onClick={props.onClick}>
            {props.value}
        </div>
    );
}

Square.defaultProps = {
    onClick: ()=>{},
};

Square.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string,
};
export default Square;