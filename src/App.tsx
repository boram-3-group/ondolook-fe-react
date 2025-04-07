import './App.scss';
import { Routes } from './pages/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
