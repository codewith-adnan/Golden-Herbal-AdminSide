import { BrowserRouter as Router } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
// react
function App() {
  return (
    <Router>
      <AdminRoutes />
    </Router>
  );
}

export default App;
