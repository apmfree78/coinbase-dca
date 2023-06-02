import 'bulmaswatch/sandstone/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import SignIn from 'user/SignIn';
import SignUp from 'user/SignUp';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from 'routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <div>Home Page</div>
          </ProtectedRoute>
        }
      />
      <Route path='/login' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route
        path='/order/:id'
        element={
          <ProtectedRoute>
            <div>see purchase order details here</div>
          </ProtectedRoute>
        }
      />
      <Route
        path='orders'
        element={
          <ProtectedRoute>
            <div>see all automated purchase orders here</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
