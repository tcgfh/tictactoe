import React, {useContext} from "react";
import { RootContext } from "./RootContext";

function fileDownload(filename, state) {
    const mye = document.createElement("a");
    mye.download = filename;
    mye.href = 'data:text/json;charset=utf-8,'+ encodeURI(JSON.stringify(state));
    mye.target = '_blank';
    mye.click();

}
function SaveToFileButton() {
    const { state: rootState } = useContext(RootContext);
    return (<button onClick={()=>fileDownload("tictactoeSaveGame.json", rootState)}>
        Save Match to File
    </button>)
}

export default SaveToFileButton;