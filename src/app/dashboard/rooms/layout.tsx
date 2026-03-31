import { isAdminUser } from '@/lib/server';

export default function RoomsLayout({
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