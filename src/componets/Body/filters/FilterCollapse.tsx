import React, { useState } from "react";
import { Button, Collapse, Form, Card } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import DateFilter from "./DateFilter";
import ClassFilter from "./ClassFilter";
import RegionFilter from "./RegionMap/RegionFilter";
import TagsFilter from "./TagsFilter";
import FlagFilter from "./FlagFilter";
import TypeFilter from "./TypeFilter";

const FilterCollapse: React.FC = () => {
        const [open, setOpen] = useState(false);

        return (
                <>
                        <Button
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                                className="mb-3"
                                variant="primary"
                        >
                                Filtros{" "}
                                {open ? <FaChevronUp /> : <FaChevronDown />}
                        </Button>
                        <Collapse in={open}>
                                <div id="example-collapse-text">
                                        <Card>
                                                <Card.Body>
                                                        <Form>
                                                                <RegionFilter
                                                                        isOpen={
                                                                                open
                                                                        }
                                                                />
                                                                <DateFilter />
                                                                <ClassFilter />
                                                                <TagsFilter />
                                                                <FlagFilter />
                                                                <TypeFilter />
                                                        </Form>
                                                </Card.Body>
                                        </Card>
                                </div>
                        </Collapse>
                </>
        );
};

export default FilterCollapse;
