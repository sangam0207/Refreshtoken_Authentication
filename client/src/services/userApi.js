import useAxiosWithTokenRefresh from "../hooks/useAxiosWithTokenRefresh";

export const useApi = () => {
  const axiosPrivate = useAxiosWithTokenRefresh();
  const dashBoard=async()=>{
    return axiosPrivate.get('/dashboard')
  }
  const playerList=async()=>{
    return axiosPrivate.get('/details')
  }

  return {
    dashBoard,
    playerList
  };
};
