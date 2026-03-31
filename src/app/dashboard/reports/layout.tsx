import { isAdminUser } from "@/lib/server";

export default function ReportsLayout({
 children
}: {
 children: React.ReactNode;
}) {

  isAdminUser()
  
  return (
    <>
      {children}
    </>
  );
}