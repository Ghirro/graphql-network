import Options from './components/Options';
import React from 'react';
import ReactDOM from 'react-dom';

function CreateOptions() {
    ReactDOM.render(
        <Options/>,
        window.document.getElementById('options'),
    );
}

CreateOptions();