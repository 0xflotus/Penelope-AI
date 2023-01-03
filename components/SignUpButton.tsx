import { Button } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons";
import { useDispatch } from "react-redux";
import { MODAL_OPEN } from "../state/action";

export const SignUpButton = () => {
  const dispatch = useDispatch();
  const signUp = async () => dispatch({ type: MODAL_OPEN });

  return (
    <Button
      rightIcon={<IconArrowNarrowRight />}
      onClick={signUp}
      radius="md"
      size="xl"
      variant="gradient"
      gradient={{ from: "indigo", to: "cyan" }}
      sx={{
        boxShadow: "none",
        transition: "box-shadow 200ms",
        "&:hover": { boxShadow: "0 0 9px 3px #748FFC" },
      }}
      styles={{
        label: { fontSize: 24 },
      }}
    >
      Sign up for free
    </Button>
  );
};
