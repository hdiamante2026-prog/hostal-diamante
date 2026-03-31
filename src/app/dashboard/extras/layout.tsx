import { isAdminUser } from "@/lib/server";

export default function ExtrasLayout({
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