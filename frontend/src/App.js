import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import { ProSidebarProvider } from 'react-pro-sidebar';

import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import SingleBlog from './pages/SingleBlog';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Layout from './pages/dashboard/global/Layout';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const DashboardHOC = Layout(Dashboard);

const App = () => {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <BrowserRouter>
          <ProSidebarProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blog/:id" element={<SingleBlog />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardHOC />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ProSidebarProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
