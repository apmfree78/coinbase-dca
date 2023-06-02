import { useUser } from "components/user/hooks/useUser";
import Layout from "layout";
import { Navigate } from "react-router-dom";
import Navbar from "routes/Navbar";

export const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <Layout>
      <>
        <Navbar />
        {children}
      </>
    </Layout>
  );
};

export default ProtectedRoute;
