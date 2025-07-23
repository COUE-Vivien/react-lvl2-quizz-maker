
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Result from '../pages/Result';

const AppRouter: React.FC = () => (
  <BrowserRouter basename='react-lvl2-quizz-maker' >
    <Routes>
      <Route path="/result" element={<Result />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
