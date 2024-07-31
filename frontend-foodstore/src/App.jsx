import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
      <div>
        <Outlet />
        <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="anonymous"></script>
      </div>
      
    </>
    
  )
}


export default App
