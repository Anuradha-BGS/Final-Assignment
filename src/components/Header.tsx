import { Box, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import AddIcon from "@material-ui/icons/Add";
import "../assets/styles/header.scss";

const Header = () => {
  const history = useHistory();
  return (
    <Box id="subHeading-box">
      <Typography variant="h3">{`Data privacy & consent`}</Typography>
      <Typography variant="h1" className="subHeading">
        {`EULA agreements`}
      </Typography>
      <Box className="descriptionBox">
        <Box>
          <Typography variant="h4" className="descriptionText">
            {`Build and manage your organization's list of approved End User Licence Agreement (EULAs) that define the legal documentation user must consent to. After they are published, relavant EULAs can be associated with applications, user flows, and privacy profiles.`}
          </Typography>
        </Box>
        <Box className="descriptionButtonContainer">
          <Button
           
            className="descriptionButton"
            id="descriptionBtn"
            variant="contained"
            onClick={() =>
              history.push({ pathname: "/eula", state: { isFreshEntry: true } })
            }
          >
            create EULA <AddIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
