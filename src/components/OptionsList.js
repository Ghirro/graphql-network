import React, {useContext} from 'react';
import {OptionsContext} from './OptionsContext';

export default function OptionsList() {
    const [urlPattList, setUrlPattList] = useContext(OptionsContext);
    
    return (
        <ul>
            {urlPattList.map((urlPatt, index) => {
                return <li key={index}>
                    {urlPatt}
                    <span className="close" onClick={() => {
                        let newUrlPattList = [...urlPattList];
                        newUrlPattList.splice(urlPattList.indexOf(urlPatt), 1);
                        setUrlPattList(newUrlPattList);
                    }}>Delete</span>
                </li>
            })}
        </ul>
    );
}