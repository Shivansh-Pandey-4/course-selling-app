import { jwtDecode } from "jwt-decode";

function decodeUserToken() {
  const token = localStorage.getItem("token");
  if (!token){
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return null;
    }

    return decoded;
    
  } catch (err) {
    console.error("Invalid user token:", err.message);
    localStorage.removeItem("token");
    return null;
  }
}

export default decodeUserToken;
