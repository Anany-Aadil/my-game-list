// "use client";
// import { useSession } from "next-auth/react";

import UserSetup from "@/components/user-setup";

export default function TempPage() {
  // const { data } = useSession();
  return (
    <div>
      <UserSetup />
    </div>
  );
}
