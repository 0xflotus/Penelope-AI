import { useSupabaseClient } from "@supabase/auth-helpers-react";
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
  const supabaseClient = useSupabaseClient();

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

      // Logging the last logged in time
      await supabaseClient
        .from("users")
        .update({ last_loggedin_at: new Date() })
        .eq("id", userData.data?.id);

      // Logging the last logged in time
      await supabaseClient
        .from("users")
        .update({ last_loggedin_at: new Date() })
        .eq("id", userData.data?.id);

      setInterval(async () => {
        try {
          await supabaseClient
            .from("users")
            .update({ last_loggedin_at: new Date() })
            .eq("id", userData.data?.id);
        } catch (err) {
          console.error(err);
        }
      }, 300000);
    };

    fetchUser();
  }, []);

  return <>{children({ authUser, checkingAuth })}</>;
};
