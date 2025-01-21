import { Navigate } from "react-router-dom";


const Protected = ({children}) =>{

    const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</> ;
}


export default Protected;