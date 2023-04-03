import { BrowserRouter, useRoutes } from 'react-router-dom'

import Index from './pages/index'
import Layout from './pages/layout'
import Translate from './pages/translate'
const routesList = [
  {
    path: '/',
    element: <Layout/>,
    children:[
      {
        element: <Index />,
        index: true, // index设置为true 变成默认的二级路由
      },
      {
        element:<Translate />,
        path:"translate"
      }
    ]
  }
]
function WrapperRoutes() {
  let element = useRoutes(routesList)
  return element
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <WrapperRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
