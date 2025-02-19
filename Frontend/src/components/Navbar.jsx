import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='p-4 bg-gray-800 text-white flex justify-between'>
      <Link to='/' className='text-lg font-bold'>Home</Link>
      <Link to='/analyze' className='text-lg'>Analyze</Link>
    </nav>
  );
}
export default Navbar;