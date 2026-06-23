// src/components/GoogleAuth.jsx
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase.js";
import BASE_URL from "../../config/apiConfig.js";
import axios from "axios";

const GoogleAuth = () => {
  const navigate = useNavigate();

  // Set the user type
  const user_type = "normal_user";

  const handleGoogleLogin = async () => {
    try {
      const firebaseToken = await signInWithGoogle();

      if (firebaseToken) {
        const response = await axios.post(`${BASE_URL}/auth/google-login`, {
          user_type: user_type,
          id_token: firebaseToken,
        });

        const data = response.data;
        const authToken = data.access_token;

        console.log("Data:", data);

        if (authToken) {
          console.log("Access Token:", authToken);
          localStorage.setItem("access_token", authToken.replace("Bearer ", ""));
          console.log("Login success, navigating to /dashboard");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default GoogleAuth;
