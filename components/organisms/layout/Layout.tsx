import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Menubar from "../../molecules/menu/Menubar";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { children } = props;
  const router = useRouter();

  useEffect(() => {
    setMenuOpen(false);
  }, [router]);

  return (
    <>
      <MainHeader setMenuOpen={setMenuOpen} />
      {menuOpen && <MenubarLayout onClick={() => setMenuOpen(false)} />}
      <Menubar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>{children}</main>
      {router.route === "/" && <MainFooter />}
    </>
  );
};

export default Layout;

const MenubarLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
`;
