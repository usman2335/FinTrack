import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AuthChecker() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await axios.get("http://localhost:5000/api/auth/check", {
          withCredentials: true,
        });
        // Token exists and is valid — do nothing
      } catch (error) {
        // Token missing or invalid — logout user
        console.log("Auth check failed, logging out");
        localStorage.removeItem("username");
        localStorage.removeItem("email");

        navigate("/"); // redirect to login
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  return null;
}

export default AuthChecker;
