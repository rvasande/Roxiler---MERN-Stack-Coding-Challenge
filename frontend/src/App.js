import Footer from "./component/Footer";
import Header from "./component/Header";
import ProductScreen from "./screen/ProductScreen";
import { Container } from "react-bootstrap";
import ProductsStatsScreen from "./screen/ProductsStatsScreen";

function App() {
  return (
    <>
    <Header />
      <main>
        <Container>
          <ProductScreen />
          <ProductsStatsScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
