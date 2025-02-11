//import Sidebar from "./sidebar";
//import SideBar from "./sidebar/SideBar";
import { Nav } from "_components";
function RootLayout({ children }) {
  return (
    <div >
      {/* <SideBar /> */}
      <Nav></Nav>
      <main  >{children}</main>
    </div>
  );
}

export default RootLayout;
