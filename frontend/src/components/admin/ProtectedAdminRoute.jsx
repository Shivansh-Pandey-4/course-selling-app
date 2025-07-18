import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import decodeAdminToken from "../../utils/decodeAdminToken";

const ProtectedAdminRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = decodeAdminToken();

    if (!adminToken || !adminToken?.isAdmin) {
      navigate("/error");
      setIsVerified(false);
    } else {
      setIsVerified(true);
    }
  }, []);

  if (isVerified === null) {
    return <div className="text-center text-xl py-10">Checking admin access...</div>;
  }

  if (!isVerified) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
