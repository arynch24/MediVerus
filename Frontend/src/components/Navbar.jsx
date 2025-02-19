import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='p-4 w-full text-white flex justify-between absolute'>
      <Link to='/' className='text-lg font-bold'>MediVerus.ai</Link>
      <Link to='/analyze' className='text-lg'>Analyze</Link>
    </nav>
  );
}
export default Navbar;