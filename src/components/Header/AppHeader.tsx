import { Button } from "antd";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routerLinks } from "../../router/routerLinks";
import { Header } from "antd/es/layout/layout";

const AppHeader: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Header style={{ backgroundColor: "transparent" }}>
      {routerLinks.map((link) => (
        <Button
          key={link.to}
          danger={location.pathname === link.to ? true : false}
          type="link"
          onClick={() => navigate(link.to)}
        >
          {link.text}
        </Button>
      ))}
    </Header>
  );
};

export default AppHeader;
