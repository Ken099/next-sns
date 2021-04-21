import Router, { useRouter } from "next/router";
import styled from "styled-components";
import nprogress from "nprogress";

import { HeadTags } from "./HeadTags";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  const router = useRouter();

  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  return (
    <>
      <HeadTags />
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};

const Container = styled.div``;
