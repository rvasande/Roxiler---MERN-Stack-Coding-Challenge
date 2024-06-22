import { useState, useEffect } from "react";
import { Container, Table, Col, Row, Image, Spinner } from "react-bootstrap";
import SearchInput from "../component/SearchInput";
import SelectMonth from "../component/SelectMonth";
import { debounce } from "../lib/utils";
import { monthsOptions } from "../constant";

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [month, setMonth] = useState("03");
  const [loading, setLoading] = useState(false);

  const seedData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/products/seedData"
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(`error SEEDING DATABASE`, error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/products?search=${searchQuery}&month=${month}`
      );
      const data = await response.json();
      setProducts(data.data.results);
    } catch (error) {
      console.error(`Error while fetching products`, error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 1000);

  useEffect(() => {
    // seedData()
    fetchProducts();
  }, [searchQuery,month]);

  return (
    <>
      <Container className="mt-5">
        <Row className="py-4">
          <Col md="4">
            <SearchInput
              placeholder={"search..."}
              onChangeValue={(e) => debouncedSearch(e.target.value)}
            />
          </Col>
          <Col md="4" >
            <SelectMonth
              options={monthsOptions}
              selectedOption={month}
              onValueChange={setMonth}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "400px" }}
              >
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Sold</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product, index) => (
                    <tr key={index}>
                      <td>{product?.id}</td>
                      <td>{product?.title}</td>
                      <td>{product?.description}</td>
                      <td>{product?.price} ₹</td>
                      <td>{product?.category}</td>
                      <td>{product?.sold ? "Yes" : "No"}</td>
                      <td>
                        <Image
                          src={product?.image}
                          alt={product?.title}
                          thumbnail
                          className="table-image imgSize"
                        />
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr className="hover:bg-[#2C3E50]/60">
                      <td className="h-24 text-center" colSpan={12}>
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductScreen;
