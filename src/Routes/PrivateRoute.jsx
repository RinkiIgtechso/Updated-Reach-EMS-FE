import { Navigate } from "react-router-dom";

function PrivateRoute({children}) {
  let auth = localStorage.getItem('auth_reachEMS');
  let role = localStorage.getItem("ReachEMS-Role");

  if(auth== null || auth=="false"){
    if(role){
      return <Navigate to={`/${role}`} />
    }else{
      return <Navigate to="/" />
    }
  }

  return children;
}

export function CheckLogin({children}){
  let auth = localStorage.getItem('auth_reachEMS');
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");

  if(role!==null && auth!==null){
    if(role==="admin" || role==="company"){
      return <Navigate to="/dashboard" />
    }else{
      return <Navigate to="/myBookings" />
    }
  }

  return children;
}

export default PrivateRoute;
