import KeepAlive from "react-activation";
import { BrowserRouter, useRoutes, HashRouter } from "react-router-dom";

import Index from "./pages/index";
import Layout from "./pages/layout";
import Translate from "./pages/translate";
import MsgList from "./pages/msgList";
import Pinyin from "./pages/pinyin";
const routesList = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: (
          <KeepAlive cacheKey="index">
            <Index />
          </KeepAlive>
        ),
        index: true, // index设置为true 变成默认的二级路由
      },
      {
        element: (
          <KeepAlive cacheKey="Translate">
            <Translate />
          </KeepAlive>
        ),
        path: "translate",
      },
      {
        element: <MsgList />,
        path: "msgList",
      },
      {
        element: (
          // <KeepAlive cacheKey="pinyin">
          <Pinyin />
          // </KeepAlive>
        ),
        path: "pinyin",
      },
    ],
  },
];
function WrapperRoutes() {
  let element = useRoutes(routesList);
  return element;
}
function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <WrapperRoutes />
      </BrowserRouter> */}
      <HashRouter>
        <WrapperRoutes />
      </HashRouter>
    </div>
  );
}

export default App;
