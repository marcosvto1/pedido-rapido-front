import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo.png'
import { useAuth } from '../../../contexts/AuthContext';

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const signOutSuccess = await auth.signOut();
    if (signOutSuccess) {
      navigate('/auth/sign_in');
    }
  }

  return <>
    <div className="w-full navbar ">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>
      <div className="flex-1 px-2 mx-2 text-lg font-bold text-white">
        <img src={Logo} alt="" width={80} />
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          <li>
            <button className="btn" onClick={handleSignOut}>
              <FontAwesomeIcon icon={faSignOut} size={'1x'} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </>
}

export default Header;