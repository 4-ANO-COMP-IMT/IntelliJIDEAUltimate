import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import MainTab from "./Tabs/MainTab/MainTab";
import FilterTab from "./Tabs/FilterTab/FilterTab";

const Body: React.FC = () => {
  const [key, setKey] = useState<string>("main");

  return (
    <Container style={{ marginTop: "5px" }}>
      <Tabs
        defaultActiveKey="main"
        id="uncontrolled-tab-example"
        className="mb-3"
        activeKey={key}
        onSelect={(k: string | null) => setKey(k || "")}
      >
        <Tab eventKey="main" title="Main">
          <MainTab isOpen={key === "main"} />
        </Tab>
        <Tab eventKey="filter" title="Filter">
          <FilterTab isOpen={key === "filter"} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Body;
