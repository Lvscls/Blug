import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";

import getCurrentUser from "../../helpers/User/getCurrentUser";
const Verify = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState(null);
  const { login } = useAuth();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchCurrentUser = async () => {
      const user = await getCurrentUser(token);
      setCurrentUser(user);
      if (user) {
        login(token, user);
        navigate("/");
      }
    };

    fetchCurrentUser();
  }, [token, navigate, login]);
  return <div>Loading</div>;
};

export default Verify;
