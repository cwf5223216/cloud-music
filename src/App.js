import React from "react";
import { IconStyle } from "./assets/iconfont/iconfont";
import { GlobalStyle } from "./style";
import { renderRoutes } from "react-router-config"; //renderRoutes
import routes from "./routes/index";
import { HashRouter } from "react-router-dom";

import { Provider } from 'react-redux'
import store from './store/'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <GlobalStyle></GlobalStyle>
          <IconStyle></IconStyle>
          {renderRoutes(routes)}
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
