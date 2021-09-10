import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const useStyle = makeStyles({
    component: {
        background: "#FFFFFF",
        color: "black",
    },
    container: {
        justifyContent: "center",
        "&  >*": {
            padding: 20,
            color: "black",
            textDecoration: "none",
        },
    },
});

const Header = () => {
    const classes = useStyle();

    const history = useHistory();
    const { oktaAuth, authState } = useOktaAuth();

    // if (authState && authState.isPending) return null;

    const login = async () => history.push("/login");

    const logout = async () => oktaAuth.signOut();

    const button = authState.isAuthenticated ? (
        <Button
            onClick={logout}
            style={{
                background: "unset",
                border: "none",
                fontSize: 16,
                textTransform: "uppercase",
                // fontFamily: "Roboto",
                cursor: "pointer",
                // opacity: 0.8,
            }}
        >
            Logout
        </Button>
    ) : (
        <Button onClick={login}>Login</Button>
    );

    return (
        <AppBar className={classes.component}>
            <Toolbar className={classes.container}>
                <Link to='/'>HOME</Link>
                <a href='https://samarimam.github.io/myportfolio/'>ABOUT</a>
                <a href='https://www.linkedin.com/in/samar-imam-7922211b7/'>
                    CONTACT
                </a>
                <Link>{button}</Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
