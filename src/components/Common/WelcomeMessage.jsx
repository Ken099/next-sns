import { useRouter } from "next/router";
import Link from "next/link";

import { Message } from "./Message";

export const HeaderMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <Message
      header={signupRoute ? "Get Started" : "Welcome Back"}
      icon={signupRoute ? "settings" : "privacy"}
      content={
        signupRoute ? "Create New Account" : "Login with Email and Password"
      }
    />
  );
};

export const FooterMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <>
      {signupRoute ? (
        <>
          <Message>
            Existing User? <Link href="/login">Login Here Instead</Link>
          </Message>
        </>
      ) : (
        <>
          <Message>
            <Link href="/reset">Forgot Password?</Link>
          </Message>

          <Message>
            New User? <Link href="/signup">Signup Here</Link> Instead{" "}
          </Message>
        </>
      )}
    </>
  );
};
