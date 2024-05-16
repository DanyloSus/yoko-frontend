// external imports
import axios from "axios";
import { useDispatch } from "react-redux";

// internal imports
import {
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";
import { UserInfo, login, userLoad } from "@/modules/redux/user/userSlice";

type HookProps = {
  user: UserInfo;
  setIsLoading: (val: boolean) => void;
  replacePageIfUserAuthed?: boolean;
  replacePageIfUserIsNotAdmin?: boolean;
  page: string;
};

const useAuthedReplace = (props: HookProps) => {
  // router for changing page by code
  const router = useRouter();

  const pathname = usePathname();

  // dispatch for slices' actions
  const dispatch = useDispatch();

  function checkUser() {
    props.setIsLoading(true);

    // if user exists then we go to another page
    if (
      (props.user.token && props.replacePageIfUserAuthed) ||
      (!props.user.token && !props.replacePageIfUserAuthed) ||
      (pathname.includes("admin") &&
        props.replacePageIfUserIsNotAdmin &&
        !props.user.isAdmin) ||
      (!pathname.includes("admin") &&
        props.replacePageIfUserIsNotAdmin &&
        props.user.isAdmin)
    ) {
      router.replace(props.page);
      props.setIsLoading(false);
      return;
    }

    // if user exists in local storage then we go to another page
    if (
      (localStorage.getItem("user") && props.replacePageIfUserAuthed) ||
      (!localStorage.getItem("user") && !props.replacePageIfUserAuthed)
    ) {
      dispatch(userLoad());
      router.replace(props.page);
      props.setIsLoading(false);
      return;
    }

    // async function for checking cookies
    async function fetchCookies() {
      try {
        // so form needs to be CSR we use requests to get cookies' values
        const res = await axios.get("/api/cookies");

        // var for token
        const { token } = res.data.message;

        // if token equal null it will log error
        if (
          (token !== null && props.replacePageIfUserAuthed) ||
          (token === null && !props.replacePageIfUserAuthed)
        ) {
          // if token equal something then we check existing user by token
          const { data } = await axios.get(
            "http://18.212.227.5:8876/api/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // if data equal user (if not then we get error), we set it to redux
          dispatch(
            login({
              id: data.id,
              email: data.email,
              name: data.name,
              surname: data.surname,
              token,
              isAdmin: false,
            })
          );

          // after change page
          router.replace(props.page);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchCookies();

    props.setIsLoading(false);
  }

  return { checkUser };
};

export default useAuthedReplace;
