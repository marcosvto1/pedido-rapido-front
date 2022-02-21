import Header from "../Header";
import Sidebar from "../Sidebar";

interface LayoutProps {
  children: React.ReactNode
}

const LayoutAdmin = ({ children }: LayoutProps) => {
  return <div>

    <div className="h-screen drawer drawer-mobile w-full">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col drawer-content">
        <Header />
        <div className="m-5">
          {children}
        </div>
      </div>
      <Sidebar />
    </div>

  </div>

}

export default LayoutAdmin;