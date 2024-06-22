import Footer from "./component/Footer";
import Header from "./component/Header";
import ProductScreen from "./screen/ProductScreen";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
    <Header />
      <main>
        <Container>
          <ProductScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
