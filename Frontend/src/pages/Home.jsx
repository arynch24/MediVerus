import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center p-10'>
      <h1 className='text-4xl font-bold text-blue-600'>Misinformation Detection</h1>
      <p className='mt-4 text-lg'>Verify information authenticity with AI.</p>
      <Link to='/analyze' className='mt-5 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg'>Get Started</Link>
    </motion.div>
  );
}
export default Home;