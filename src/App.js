import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import MyProjects from './pages/MyProjects';
import PrivateLayout from './layouts/PrivateLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />

        {/* Private routes with navbar */}
        <Route element={<PrivateLayout />}>
          <Route path="/mes-projets" element={<MyProjects />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;