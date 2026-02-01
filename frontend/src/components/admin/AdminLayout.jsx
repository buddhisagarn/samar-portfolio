import AdminSidebar from "./AdminNav";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Page Content */}
      <div className="flex-1 ml-0 md:ml-64 p-6">{children}</div>
    </div>
  );
};

export default AdminLayout;
