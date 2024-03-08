"use client";
import { PersonIcon, StarIcon } from "@radix-ui/react-icons";
import { Box, Container, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const path = usePathname();
  const { status, data: session } = useSession();
  const roles = [
    { role: "ADMIN", label: "管理员" },
    { role: "WXUSER", label: "员工" },
  ];
  const links = [
    // { href: "/", label: "统计图表" },
    { href: "/travelServices", label: "疗休养批次" },
  ];
  return (
    <nav className="flex space-x-6 px-5 border-b items-center h-14">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/travelServices"}>
              <StarIcon />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li
                  key={link.href}
                  className={classNames({
                    "text-zinc-900": link.href === path,
                    "text-zinc-500": link.href !== path,
                    "hover:text-zinc-800 transition-colors": true,
                  })}
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href={"/api/auth/signout"}>
                <Flex align={"center"} gap={"1"}>
                  <PersonIcon />
                  <Text size="2" className="text-zinc-500">
                    {session.user?.ygmc}
                  </Text>
                  <Text className="text-gray-300" size="1">
                    {
                      roles.find((role) => role.role === session.user!.role)
                        ?.label
                    }
                  </Text>
                </Flex>
              </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
