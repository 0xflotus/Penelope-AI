import { Text } from "@mantine/core";
import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const Logo = () => {
  return (
    <Link href="/" passHref style={{ textDecoration: "none" }}>
      <Text
        className={inter.className}
        weight={900}
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan", deg: 45 }}
      >
        Penelope
      </Text>
    </Link>
  );
};
