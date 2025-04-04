import './App.scss';
import { Routes } from './pages/Routes';

function App() {
  return (
    <div className="app">
      <div className="web-side__banner">
        <div className="web-side__banner__content">
          <h1>Welcome to our OndoLook!</h1>
        </div>
      </div>
      <div className="mobile-content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
