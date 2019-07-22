import React, {useState, useEffect} from 'react';
import OptionsHeader from './OptionsHeader';
import OptionsList from './OptionsList';
import {OptionsContext} from './OptionsContext';

export default function Options() {

    const [urlPattList, setUrlPattList] = useState([]);

    useEffect(() => {
        chrome.storage.sync.get('urlPattList', (data) => {
            if(Array.isArray(data.urlPattList)) {
                setUrlPattList(data.urlPattList);
            }
        });
    }, []);

    return <OptionsContext.Provider value={[urlPattList, setUrlPattList]}>
        <OptionsHeader></OptionsHeader>
        <OptionsList></OptionsList>
    </OptionsContext.Provider>
}