import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// The ReactDOM library is used to render the React application to the DOM.
// The App component is imported and rendered inside a StrictMode component, which ensures that the application follows best practices and highlights potential issues.
// The index.css file is imported to provide global styles for the application.
// The ReactDOM.render function is called with the App component as the root component and the root element in the HTML document as the mounting point.
