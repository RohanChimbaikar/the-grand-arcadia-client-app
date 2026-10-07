import SideNavigation from "../_components/SideNavigation";
import ToastMessage from "../_components/ToastMessage";

function Layout({ children }) {
  return (
    <>
      <div className="grid grid-cols-1 h-full gap-6 lg:grid-cols-[16rem_1fr] lg:gap-12">
        <SideNavigation />
        <div className="min-w-0 py-1">{children}</div>
      </div>
      <ToastMessage />
    </>
  );
}

export default Layout;
