"use client";

import {
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";
import { useEffect } from "react";

const EmptySite = () => {
  // router for changing page by code
  const router = useRouter();
  // get page's pathname
  const pathname = usePathname();

  useEffect(() => {
    let link;

    const lastSlashIndex = pathname.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      link = pathname.slice(0, lastSlashIndex);
    } else {
      link = pathname;
    }

    router.replace(link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default EmptySite;
