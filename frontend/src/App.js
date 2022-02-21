import { useState, useEffect } from 'react';
import List from './components/List';
import Details from './components/Details';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const getBlocks = async () => {
      const blocksFromServer = await fetchBlocks();
      setBlocks(blocksFromServer);
    }
    getBlocks();
  }, []);

  const fetchBlocks = async () => {
    const res = await fetch('http://localhost:3000/blocks', { mode: 'cors' });
    return await res.json();
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' exact element={<List blocks={blocks} />} />
          <Route path='/:hash' element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
