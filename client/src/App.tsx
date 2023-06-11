import 'bulmaswatch/sandstone/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import SignIn from 'user/SignIn';
import SignUp from 'user/SignUp';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from 'routes/ProtectedRoute';
import Orders from 'orders/Orders';
import OrderHome from 'orders/OrderHome';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <OrderHome />
          </ProtectedRoute>
        }
      />
      <Route path='/login' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route
        path='/order/:id'
        element={
          <ProtectedRoute>
            <OrderHome />
          </ProtectedRoute>
        }
      />
      <Route
        path='orders'
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
