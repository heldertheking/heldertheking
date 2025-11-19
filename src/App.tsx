import {BrowserRouter, useRoutes} from 'react-router-dom';
import {routes} from './routes';
import Navigation from "./components/Navigation.tsx";

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-screen">
          <Navigation></Navigation>
        <main className="flex flex-1 max-h-screen w-full p-16 pt-8 pb-8 overflow-auto">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
