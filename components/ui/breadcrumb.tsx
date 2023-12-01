"use client";

import { LucideChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadCrumbProps {
  crumbs?: {
    name: string;
    path: string;
  }[];
}

export const BreadCrumb = ({ crumbs }: BreadCrumbProps) => {
  const pathname = usePathname();

  if (crumbs == undefined) {
    const temp = pathname.split("/");
    temp.shift();

    crumbs = temp.map((crumb, index) => {
      return {
        name: crumb,
        path: temp.slice(0, index + 1).join("/"),
      };
    });

    crumbs.unshift({
      name: "Home",
      path: "/",
    });
  }

  return (
    <div>
      <ul className="flex flex-row gap-2 text-sm">
        {crumbs.map((crumb, index) => {
          return (
            <li key={index}>
              <Link
                href={crumb.path}
                className={`${
                  index !== crumbs!.length - 1
                    ? "text-slate-500"
                    : "text-primary"
                } flex flex-row items-center gap-2 capitalize`}
              >
                {crumb.name}
                {index !== (crumbs?.length ?? 0) - 1 && (
                  <LucideChevronRight size={16} />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
