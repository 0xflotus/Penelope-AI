import { Box, Loader } from "@mantine/core";
import { HeaderMegaMenu } from "./Header";

export const LoadingPlaceholder = ({
  authUser,
  checkingAuth,
}: {
  authUser: any;
  checkingAuth: boolean;
}) => {
  return (
    <>
      <HeaderMegaMenu authUser={authUser} checkingAuth={checkingAuth} />
      <Box
        w="100%"
        h="calc(100vh - 100px)"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader color="indigo" />
      </Box>
    </>
  );
};
