import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import SelectMonth from "../component/SelectMonth";
import { monthsOptions } from "../constant";

const ProductsStatsScreen = () => {
  const [month, setMonth] = useState("01");
  const [stats, setStats] = useState([]);

  const fetchProductsStats = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/products/stats/${month}`
      );
      const data = await response.json();
      setStats(data.data);
    } catch (error) {
      console.error(`Error while fetching stats`, error);
    }
  };

  useEffect(() => {
    fetchProductsStats();
  }, [month]);

  return (
    <Container>
      <Row className="justify-content-center my-5">
        <Col xs={12} sm={8} md={6} lg={5}>
          <Card className="mx-auto" style={{ width: "100%" }}>
            <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <Card.Title>Statistics</Card.Title>
                </Col>
                <Col>
                  <SelectMonth
                    month={month}
                    setMonth={setMonth}
                    options={monthsOptions}
                    onValueChange={setMonth}
                  />
                </Col>
              </Row>
              <Card.Text>Total sale : {stats?.totalSaleAmount}</Card.Text>
              <Card.Text>Total sold items : {stats?.totalSoldItems}</Card.Text>
              <Card.Text>Total not sold items : {stats?.totalNotSoldItems}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsStatsScreen;
