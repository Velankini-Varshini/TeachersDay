import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Murali from './pages/Murali';
import Prabhakar from './pages/Prabhakar';
import Anjali from './pages/Anjali';
import NagaSirisha from './pages/NagaSirisha';
import Sindhuja from './pages/Sindhuja';
import GeethaReddy from './pages/GeethaReddy';
import Sphoorthi from './pages/Sphoorthi';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/murali" element={<Murali />} />
        <Route path="/prabhakar" element={<Prabhakar />} />
        <Route path="/anjali" element={<Anjali />} />
        <Route path="/naga-sirisha" element={<NagaSirisha />} />
        <Route path="/sindhuja" element={<Sindhuja />} />
        <Route path="/geetha-reddy" element={<GeethaReddy />} />
        <Route path="/sphoorthi" element={<Sphoorthi />} />
      </Routes>
    </Router>
  );
}

export default App;
