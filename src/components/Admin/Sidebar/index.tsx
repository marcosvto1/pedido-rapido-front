import {
  Link,
} from 'react-router-dom';

const Sidebar = () => {
  return <>
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 overflow-y-auto w-80 bg-neutral-focus text-base-content">
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="products">Produtos</Link></li>
        <li><Link to="categories">Categorias</Link></li>
        <li><Link to="employees">Funcionários</Link></li>
      </ul>
    </div>
  </>
}

export default Sidebar;