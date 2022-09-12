import { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Context } from "../shared/config/context";
import { useLocation } from "react-router";
import { createNotification } from "../shared/config/toast";
import "../assets/styles/generalSettings.scss";

interface IDraft {
  name: string;
  id: string;
  description: string;
  tag: string;
  status: string;
}

interface IProps {
  data: boolean;
}

const GeneralSettings = ({ data }: IProps) => {
  const context = useContext(Context);
  const location: any = useLocation();
  const [changesSaved, setChangesSaved] = useState<boolean>(false);
  const [draft, setDraft] = useState<IDraft>({
    name: "",
    id: "",
    description: "",
    tag: "",
    status: "Draft",
  });

  useEffect(() => {
    setDraft({
      name: data !== undefined ? "" : context.currentEula.name ?? "",
      id: data !== undefined ? "" : context.currentEula.id ?? "",
      description:
        data !== undefined ? "" : context.currentEula.description ?? "",
      tag: data !== undefined ? "" : context.currentEula.tag ?? "",
      status:
        data !== undefined ? "Draft" : context.currentEula.status ?? "Draft",
    });

    location?.state?.isViewDraftClick && setChangesSaved(false);
  }, [context.currentEula, location?.state?.isViewDraftClick, data]);

  const handleDraftInput = (value: string, field: string): void => {
    switch (field) {
      case "name":
        draft.name.length < 100 &&
          setDraft((prevState: IDraft) => {
            return {
              ...prevState,
              name: value,
            };
          });
        break;
      case "id":
        setDraft((prevState: IDraft) => {
          return {
            ...prevState,
            id: value,
          };
        });
        break;
      case "desc":
        draft.description.length < 512 &&
          setDraft((prevState: IDraft) => {
            return {
              ...prevState,
              description: value,
            };
          });
        break;
      case "tag":
        setDraft((prevState: IDraft) => {
          return {
            ...prevState,
            tag: value,
          };
        });
        break;
      default:
        setDraft({
          name: "",
          id: "",
          description: "",
          tag: "",
          status: "Draft",
        });
        break;
    }
  };

  const handleSaveEula = (): void => {
    setChangesSaved(true);
    if (location?.state?.isViewDraftClick) {
      let tempData: IDraft[] = [...context.savedEula];
      tempData[location?.state?.index] = draft;
      context.setSavedEula([...tempData]);
      createNotification("info", "Draft has been updated");
    } else {
      context.setSavedEula([...context.savedEula, draft]);
      createNotification("success", "Draft has been saved");
    }
  };

  const handleCancelEula = (): void => {
    setDraft({
      name: "",
      id: "",
      description: "",
      tag: "",
      status: "Draft",
    });
    createNotification("warning", "Draft has been cleared");
  };

  return (
    <Box width="75%" p={2} className={"wrapper-general"}>
      <Box>
        <Typography variant="h2" className={"normalFontWeight"}>
          General Settings
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="h5" className={"normalFontWeight"}>
          Give your EULA a name, description, and tags to make it easy to find
          and apply rules.
        </Typography>
      </Box>
      <Box maxWidth="100%" my={4}>
        <Box my={2}>
          <Box display="flex" justifyContent="space-between" width="40%">
            <Typography variant="h5" className={"label"}>
              EULA name
            </Typography>
            <Typography variant="h5" className={"label"}>
              {`${draft.name.length}/100`}
            </Typography>
          </Box>
          <TextField
            required
            className={"textField"}
            id="standard-required"
            size="small"
            value={draft.name}
            onChange={(e) => handleDraftInput(e.target.value, "name")}
            placeholder="Type Eula name"
          />
          {draft.name.length === 100 && (
            <Typography variant="h6" className={"warningText"}>
              Maximum name size reached!
            </Typography>
          )}
        </Box>
        <Box my={2}>
          <Typography variant="h5" className={"label"}>
            Eula Id
          </Typography>
          <TextField
            required
            id="standard-required"
            className={"textField"}
            size="small"
            value={draft.id}
            onChange={(e) => handleDraftInput(e.target.value, "id")}
            placeholder="Type Eula Id"
          />
        </Box>
        <Box my={2}>
          <Box display="flex" justifyContent="space-between" width="40%">
            <Typography variant="h5" className={"label"}>
              Description (Optional)
            </Typography>
            <Typography variant="h5" className={"label"}>
              {`${draft.description.length}/512`}
            </Typography>
          </Box>
          <TextField
            id="filled-multiline-static"
            className={"textField"}
            multiline
            value={draft.description}
            onChange={(e) => handleDraftInput(e.target.value, "desc")}
            placeholder="Type a description of the Eula"
            rows={4}
          />
          {draft.description.length === 512 && (
            <Typography variant="h6" className={"warningText"}>
              Maximum description size reached!
            </Typography>
          )}
        </Box>
        <Box my={2}>
          <Typography variant="h5" className={"label"}>
            Tags (Optional)
          </Typography>
          <TextField
            required
            id="standard-required"
            className={"textField"}
            size="small"
            value={draft.tag}
            onChange={(e) => handleDraftInput(e.target.value, "tag")}
            placeholder="Type name of the tag"
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Box marginRight={"10px"}>
          <Button
            variant="contained"
            onClick={() => handleCancelEula()}
            className={"cancelButton"}
          >
            Cancel
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            className={"saveButton"}
            onClick={() => handleSaveEula()}
            disabled={
              draft.name.length === 0 || draft.id.length === 0 || changesSaved
            }
          >
            Save Chanegs
          </Button> 
        </Box>
      </Box>
    </Box>
  );
};

export default GeneralSettings;
