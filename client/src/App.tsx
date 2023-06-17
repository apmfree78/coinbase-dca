import 'bulmaswatch/sandstone/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import SignIn from 'user/SignIn';
import SignUp from 'user/SignUp';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from 'routes/ProtectedRoute';
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
    </Routes>
  );
}

export default App;
