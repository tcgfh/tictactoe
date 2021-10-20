import React, {useContext, useEffect, useRef} from "react";
import { RootContext } from "./RootContext";

function LoadFromFileButton() {
    const {dispatch, actionTypes} = useContext(RootContext);
    const inputRef = useRef();
    const chooseFile = ()=>{
        if(inputRef.current) {
            inputRef.current.click();
        }
    };
    const dispatchStateLoad = ()=>{
        if (!inputRef.current) return;
        const fileHandle = inputRef.current.files.length > 0 && inputRef.current.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener("load", ()=>{
            const stateText = fileReader.result;
            try {
                const stateFromFile = JSON.parse(stateText);
                dispatch({
                    type: actionTypes.loadOverallState,
                    state: stateFromFile,
                });
            } catch(e) {
                console.error(e);
            }
        });

        fileReader.readAsText(fileHandle);

    };
    return (<>
        <input ref={inputRef} type="file" accept=".json" style={{display: "none"}} onChange={dispatchStateLoad}/>
        <button onClick={chooseFile}>Load Match from File</button>
    </>);
}

export default LoadFromFileButton;