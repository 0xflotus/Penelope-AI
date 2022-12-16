import { Text } from "@mantine/core";
import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const Logo = () => {
  return (
    <Link
      href="/"
      passHref
      style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "baseline",
        columnGap: 6,
      }}
    >
      <Text
        className={inter.className}
        weight={900}
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan", deg: 45 }}
        fz="md"
      >
        Penelope
      </Text>
      <Text
        fz="xs"
        fs="italic"
        weight={800}
        sx={(theme) => ({ color: theme.colors.yellow[7] })}
      >
        ALPHA
      </Text>
    </Link>
  );
};
