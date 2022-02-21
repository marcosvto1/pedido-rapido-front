import Logo from '../../../assets/logo.png'

const Header = () => {
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
          <li><a>Sair</a></li>
        </ul>
      </div>
    </div>
  </>
}

export default Header;