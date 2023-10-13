import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListScreen from './components/ShowList/ShowList';
import DetailsScreen from './components/ShowDetails/ShowDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/details/:id" element={<DetailsScreen />} />
        <Route path="/" element={<ListScreen />} />
      </Routes>
    </Router>
  );
};

export default App;