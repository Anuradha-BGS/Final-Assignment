import { Box, Chip, Container, Divider, Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../components/Breadcrumb";
import GeneralSettings from "../components/GeneralSettings";
import PublishSettings from "../components/PublishSettings";
import TermsofUse from "../components/TermsofUse";
import { Context } from "../shared/config/context";
import { useLocation } from "react-router";
import "../assets/styles/eula.scss";

const Eula = () => {
  const location: any = useLocation();
  const context = useContext(Context);
  const [currentPage, setCurrentPage] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("GeneralSettings");

  useEffect(() => {
    let url: string = window.location.pathname.slice(1);
    setCurrentPage(url);
  }, []);

  const handleTabSelection = (selectedTab: string) => {
    switch (selectedTab) {
      case "GeneralSettings":
        setSelectedTab("GeneralSettings");
        break;
      case "TermsofUse":
        setSelectedTab("TermsofUse");
        break;
      default:
        setSelectedTab("GeneralSettings");
        break;
    }
  };

  return (
    <Box py={5} className={"wrapper"}>
      <Container>
        <BreadCrumb currentPage={currentPage} />
        <Box my={2}>
          <Typography variant="h2" className={"normalFontWeight"}>
            Title
          </Typography>
        </Box>
        <Chip
          className={
            context.currentEula.status === "Active" &&
            !location?.state?.isFreshEntry
              ? "publishedDraft"
              : "unsavedDraft"
          }
          label={
            context.currentEula.status === "Active" &&
            !location?.state?.isFreshEntry
              ? "Active"
              : "Draft"
          }
        />
        <Box display="flex" className={"subWrapper"} my={2}>
          <Box width="20%" maxWidth="55%" p={2} className={"firstPan"}>
            <Box my={1}>
              <Typography
                className={"firstPanText"}
                onClick={() => handleTabSelection("GeneralSettings")}
              >
                General Settings
              </Typography>
            </Box>
            <Box my={1}>
              <Typography
                className={"firstPanText"}
                onClick={() => handleTabSelection("TermsofUse")}
              >
                Terms of use
              </Typography>
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          {selectedTab === "GeneralSettings" ? (
            <GeneralSettings data={location?.state?.isFreshEntry} />
          ) : (
            <TermsofUse />
          )}
          <PublishSettings data={location?.state?.isFreshEntry} />
        </Box>
      </Container>
    </Box>
  );
};

export default Eula;
