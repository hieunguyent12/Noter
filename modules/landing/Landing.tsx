import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { PageComponent } from "../../types";

const Landing: PageComponent<{}> = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !session.error && !loading) {
      if (session.hasProvidedInfo) {
        router.replace("/home");
      } else {
        router.replace("/info");
      }
    }
  }, [session, loading, router]);

  return (
    <div>
      <p>Welcome To Noter!</p>
      <button onClick={() => signIn()}>Log in</button>
      <button
        onClick={() => {
          fetch("/api/hello");
        }}
      >
        Sign up
      </button>
    </div>
  );
};

Landing.auth = false;

export default Landing;
