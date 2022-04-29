import type { NextPage } from 'next'
import Sidebar from '../components/Sidebar';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.Home}>
      <Sidebar />
    </div>
  );
}

export default Home
