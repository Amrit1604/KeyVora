import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PadsPage from './pages/PadsPage';
import CreatePadPage from './pages/CreatePadPage';
import EditPadPage from './pages/EditPadPage';
import ViewPadPage from './pages/ViewPadPage';
import AboutPage from './pages/AboutPage';
import FeedbackPage from './pages/FeedbackPage';
import SupportPage from './pages/SupportPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pads" element={<PadsPage />} />
          <Route path="/pads/new" element={<CreatePadPage />} />
          <Route path="/pads/:id" element={<ViewPadPage />} />
          <Route path="/pads/:id/edit" element={<EditPadPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
