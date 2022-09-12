import { Breadcrumbs, Link } from "@material-ui/core";
import { useHistory } from "react-router";

interface Iprop {
  currentPage: string;
}

const BreadCrumb = ({ currentPage }: Iprop) => {
  const history = useHistory();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" onClick={() => history.push("/")}>
        {`Data privacy & consent`}
      </Link>
      <Link
        color="textPrimary"
        onClick={() => history.push(`/${currentPage}`)}
        aria-current="page"
      >
        {currentPage}
      </Link>
    </Breadcrumbs>
  );
};

export default BreadCrumb;
