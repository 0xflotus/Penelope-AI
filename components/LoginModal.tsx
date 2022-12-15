import { Alert, Button, Divider, Input, Modal, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_CLOSE } from "../state/action";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { IconCheck, IconAlertCircle } from "@tabler/icons";
import { GoogleIcon } from "./GoogleIcon";

const emailRegex =
  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

export const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const isLoginModalOpen = useSelector(
    (state) => (state as any).isLoginModalOpen
  );
  const dispatch = useDispatch();
  const supabaseClient = useSupabaseClient();

  const loginWithGoogle = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const loginWithOTP = async () => {
    if (!emailRegex.test(email)) return;

    setSendingEmail(true);
    setIsSuccess(false);
    setIsError(false);

    const { data, error } = await supabaseClient.auth.signInWithOtp({
      email,
    });

    if (error === null) {
      setIsSuccess(true);
      setIsError(false);
    } else {
      setIsSuccess(false);
      setIsError(true);
      setErrorText(error.message);
    }

    setSendingEmail(false);
  };

  return (
    <Modal
      opened={isLoginModalOpen}
      onClose={() => dispatch({ type: MODAL_CLOSE })}
      title="Welcome to Penelope"
      sx={{ zIndex: 1000001 }}
    >
      {/* Modal content */}
      <Button
        leftIcon={<GoogleIcon />}
        variant="default"
        color="gray"
        fullWidth
        radius="xl"
        onClick={loginWithGoogle}
      >
        Continue with Google
      </Button>
      {/* <Text ta="center" my={30} c="dimmed">
        Or continue with email
      </Text> */}
      <Divider label="Or continue with email" labelPosition="center" my="xl" />
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await loginWithOTP();
        }}
      >
        <Input
          placeholder="Your email"
          radius="lg"
          mb={10}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          fullWidth
          radius="xl"
          color="indigo"
          type="submit"
          loading={sendingEmail}
        >
          Continue
        </Button>
      </form>
      {isSuccess && (
        <Alert
          icon={<IconCheck size={16} />}
          title="Success!"
          color="green"
          radius="md"
          mt={20}
        >
          <Text>Check your email for a login link.</Text>
          <Text>If you don&apos;t see the email, check your spam folder.</Text>
        </Alert>
      )}
      {isError && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Bummer!"
          color="red"
          radius="md"
          mt={20}
        >
          <Text>{errorText}</Text>
        </Alert>
      )}
    </Modal>
  );
};
