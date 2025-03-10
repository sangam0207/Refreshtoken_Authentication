
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from './useRefreshToken'
import { useAuth } from "../context/authContext";

const useAxiosWithTokenRefresh=()=>{
    const refreshToken=useRefreshToken();
    const {token}=useAuth();

    useEffect(()=>{
      const requestIntercept=axiosPrivate.interceptors.request.use(
        config=>{
            if(!config.headers['Authorization']){
                config.headers['Authorization']=`Bearer ${token}`;
            }
            return config;
        },(error)=>Promise.reject(error)
      );
                                         
    
     const responseIntercept=axiosPrivate.interceptors.response.use(
        response=>response,
        async(error)=>{
          const prevRequest=error?.config;
          if(error?.response?.status===403 && !prevRequest?.sent){
            prevRequest.sent=true;
            const newAccessToken=await refreshToken();
          //  console.log(newAccessToken)
            prevRequest.headers['Authorization']=`Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(error)
        }
     );

     return ()=>{
        axiosPrivate.interceptors.response.eject(responseIntercept)
        axiosPrivate.interceptors.request.eject(requestIntercept)
    }
    },[token,refreshToken])
    return axiosPrivate;
}
export default useAxiosWithTokenRefresh




