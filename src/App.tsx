import React from "react";
import Header from "./componets/Header";
import Body from "./componets/Body/Body";
import RegionFilter from "./componets/Body/filters/RegionMap/RegionFilter";

const App: React.FC = () => {
        return (
                <>
                        <Header />
                        <Body />
                </>
        );
};

export default App;
