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
        <Navigation />
        <main className="block flex-1 max-h-screen justify-center items-center w-full p-16">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
