import { jwtDecode } from "jwt-decode";

function decodeAdminToken() {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return null
   };

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      localStorage.removeItem("adminToken");
      return null;
    }

    return decoded;
  } catch (err) {
    console.error("Failed to decode token:", err.message);
    localStorage.removeItem("adminToken");
    return null;
  }
}

export default decodeAdminToken;
