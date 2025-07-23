
import { QuizzDataProvider } from './providers/QuizzDataProvider';
import AppRouter from './router/Router';

function App() {
  return (
    <QuizzDataProvider>
      <AppRouter />
    </QuizzDataProvider>
  );
}

export default App;
