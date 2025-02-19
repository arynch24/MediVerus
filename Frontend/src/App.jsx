import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';  // Corrected import
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyze from './pages/Analyze';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/analyze' element={<Analyze />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
