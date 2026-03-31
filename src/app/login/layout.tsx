import { StartLoading } from "@/components";
import { Suspense } from "react";



async function LoginContent({ children }: { children: React.ReactNode }) {

  return (
    <>
      {children}
    </>
  )
}

export default function LoginLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<StartLoading/>}>
        <LoginContent>
          {children}
        </LoginContent>
      </Suspense>
    </>
  );
}