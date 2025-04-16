import { useEffect, useState } from "react";
import api from "../../api.js";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    api
      .get("/protected")
      .then((res) => setMsg(res.data.msg))
      .catch(() => nav("/login"));
  }, []);

  return <div>{msg}</div>;
}

export default Dashboard;
