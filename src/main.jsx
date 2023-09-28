import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './pageStructure/header/header';
import PlayArea from './pageStructure/playArea/PlayArea';

import './base.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Header />
    <PlayArea />
  </>,
)
