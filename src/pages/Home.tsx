import { Box, Container } from "@material-ui/core";
import DataTable from "../components/DataTable";
import Header from "../components/Header";
import "../assets/styles/home.scss";
const Home = () => {
  return (
    <Box py={5} className="wrapper-home">
      <Container maxWidth="lg">
        <Header />
        <DataTable />
      </Container>
    </Box>
  );
};

export default Home;
