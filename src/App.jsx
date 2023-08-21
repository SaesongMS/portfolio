import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </BrowserRouter>
    </Suspense>
  )
}

export default App
