import { useState, useEffect } from "react";
import { Container, Table,Col, Row, Image } from "react-bootstrap";

const ProductScreen = () => {
  const [products, setProducts] = useState([]);

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
    try {
      const response = await fetch("http://localhost:5000/api/v1/products");
      const data = await response.json();
      console.log("dddddd", data.data.results);
      setProducts(data.data.results);
    } catch (error) {
      console.error(`Error while fetching products`, error);
    }
  };

  useEffect(() => {
    // seedData()
    fetchProducts();
  }, []);

  return (
    <>
 <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Product Table</h1>
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
                  <td>{product?.price}</td>
                  <td>{product?.category}</td>
                  <td>{product?.sold ? 'Yes' : 'No'}</td>
                  <td>
                    <Image src={product?.image} alt={product?.title} thumbnail className="table-image" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default ProductScreen;
