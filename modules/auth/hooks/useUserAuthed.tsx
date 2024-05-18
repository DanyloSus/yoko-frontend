// external imports
import axios from "axios";
import { useDispatch } from "react-redux";

// internal imports
import { UserInfo, login, userLoad } from "@/modules/redux/user/userSlice";

type HookProps = {
  user: UserInfo;
  setSigned: (val: boolean) => void;
};

const useUserAuthed = (props: HookProps) => {
  // dispatch for slices' actions
  const dispatch = useDispatch();

  function checkUser() {
    // if user's token exists in redux storage then we set that user is authed
    if (props.user.token) {
      props.setSigned(true);
      return;
    }

    // if user exists in local storage then we load his values and that user is authed
    if (localStorage.getItem("user")) {
      dispatch(userLoad());
      props.setSigned(true);
      return;
    }

    // async function for checking cookies
    async function fetchCookies() {
      try {
        // so header needs to be CSR we use requests to get cookies' values
        const res = await axios.get("/api/cookies");

        // var for token
        let token = res.data.message.token;

        // if token equal null it will log error
        if (token !== null) {
          // if token equal something then we check existing user by token
          const { data } = await axios.get("/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // if data equal user (if not then we get error), we set it to redux
          dispatch(
            login({
              id: data.id,
              email: data.email,
              name: data.name,
              surname: data.surname,
              token,
              isAdmin: data.name ? false : true,
            })
          );

          props.setSigned(true);
        }
      } catch (error) {
        console.log(error);
        props.setSigned(false);
      }
    }

    fetchCookies();
  }

  return { checkUser };
};

export default useUserAuthed;
