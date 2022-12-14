import Button from "components/Button";
import { FiLogOut } from "react-icons/fi";
import React from "react";
import { UserContext } from "context";
import logo from 'assets/images/logo.png';
import { logout } from "firebase-config";
import styling from "./Nav.module.scss";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const Nav = ({ children }) => {
  const { t } = useTranslation();
  const [user, setData] = useContext(UserContext);

  const signOut = async () => {
    try {
      await logout();
      setData(null);
    } catch {
      toast.error(t("errors.sign_out"), {
        id: 'global'
      });
    }
  };

  // Strange bug when using process directly in the href.
  const REACT_APP_WEBSITE = process.env.REACT_APP_WEBSITE;

  return (
    <nav className={styling.navbar}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={REACT_APP_WEBSITE}
      >
        <img src={logo} alt="logo" />
      </a>

      <div className={styling.buttons}>
        {children}
        {user && (
          <Button
            onClick={() => signOut()}
            variant="danger"
            icon={<FiLogOut />}
          >
            {t("actions.sign_out")}
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
