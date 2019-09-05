import React, {useState, useContext} from 'react';
import {OptionsContext} from './OptionsContext';

function saveOptions(urlPattList) {
    chrome.storage.sync.set({urlPattList: urlPattList}, function() {
        alert("Saved Successfully");
    })
}

function addUrlPatt(urlPattList, urlPatt, setUrlPattList) {
    setUrlPattList([...urlPattList, urlPatt]);
}

export default function OptionsHeader() {
    
    const [urlPattList, setUrlPattList] = useContext(OptionsContext);
    const [urlPatt, setUrlPatt] = useState();
    
    return (
        <div className="header">
            <h2 className="inputUrlPatt">Add custom grapql url or regx parren</h2>
            <input type="text" placeholder="url or regx pattern" value={urlPatt} onChange={(e) => {setUrlPatt(e.target.value)}}/>
            <button className="addBtn" onClick={(e) => {urlPatt && urlPatt.length>0 && addUrlPatt(urlPattList, urlPatt, setUrlPattList); setUrlPatt("");}}>Add</button>
            <button className="addBtn" onClick={() => {saveOptions(urlPattList)}}>Save</button>
        </div>
    );
}