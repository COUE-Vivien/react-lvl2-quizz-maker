
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Result from '../pages/Result';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/result" element={<Result />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
