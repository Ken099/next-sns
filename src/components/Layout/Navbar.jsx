import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

export const Navbar = () => {
  const router = useRouter();
  const isActive = (route) => router.pathname === route;
  return (
    <>
      <div>
        <div>
          <Link href="/login">
            <a>Login</a>
            {/* <a bbb={isActive("/login")}>Login</a> */}
          </Link>

          <Link href="/signup">
            <a>Signup</a>
            {/* <a bbb={isActive("/signup")}>Signup</a> */}
          </Link>
        </div>
      </div>
    </>
  );
};

const Container = styled.div``;
