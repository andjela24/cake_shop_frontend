import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
    const isLoggedIn = useSelector((state) => !!state.accessToken);
    const accessToken = useSelector((state) => state.accessToken);
    const refreshToken = useSelector((state) => state.refreshToken);
    const setAccessToken = useSelector((state) => state.setAccessToken);
    const setRefreshToken = useSelector((state) => state.setRefreshToken);
    const clearTokens = useSelector((state) => state.clearTokens);
    const clearAccessToken = useSelector((state) => state.clearAccessToken);
    const clearRefreshToken = useSelector((state) => state.clearRefreshToken);
    // const login = useLoginMutation();
    // const logout = useLogoutMutation();
    // const me = useFetchMeQuery({ enabled: !!accessToken });
  
    return {
    //   me,
    //   login,
    //   logout,
      isLoggedIn,
      accessToken,
      refreshToken,
      clearRefreshToken,
      clearAccessToken,
      setRefreshToken,
      setAccessToken,
      clearTokens,
    };
  };
  
  