import styles from './App.module.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Header from '../components/header/Header';
import TransactionHistoriPage from '../pages/history/TransactionHistoriPage';
import GoalPage from '../pages/goals/GoalsPage';



function App() {
  return (
    <Router>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<TransactionHistoriPage />} />
          <Route  path='/goals' element={<GoalPage />}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
