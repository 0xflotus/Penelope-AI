import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN, LOGOUT } from "../state/action";

export const AuthContainer = ({
  children,
}: {
  children: ({
    authUser,
    checkingAuth,
  }: {
    authUser: any;
    checkingAuth: boolean;
  }) => React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useDispatch();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    const fetchUser = async () => {
      setCheckingAuth(true);

      const { data } = await supabaseClient.auth.getUser();

      if (data.user === null) {
        setCheckingAuth(false);
        dispatch({
          type: LOGOUT,
        });
        return;
      }

      const { user } = data;

      // try to fetch user data to see if they already have an account or not.
      const { count } = await supabaseClient
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("id", user.id);

      if ((count as number) === 0) {
        // register on DB
        await supabaseClient.from("users").insert({
          id: user.id,
          email: user.email,
        });
      }

      const userData = await supabaseClient
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      dispatch({
        type: LOGIN,
      });
      setAuthUser(userData.data);
      setCheckingAuth(false);
    };

    fetchUser();
  }, []);

  return <>{children({ authUser, checkingAuth })}</>;
};
