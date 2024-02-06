"use client";
import classNames from "classnames";
import Link from "next/link";
import { RiQuestionnaireFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const path = usePathname();
  const links = [
    { href: "/", label: "统计图表" },
    { href: "/travelServiceRatings", label: "疗休养评分" },
  ];
  return (
    <nav className="flex space-x-6 mb-5 px-5 border-b items-center h-14">
      <Link href={"/"}>
        <RiQuestionnaireFill />
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
    </nav>
  );
};

export default NavBar;
