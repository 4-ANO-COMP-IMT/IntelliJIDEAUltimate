import React from "react";
import { Card, Form, Tab } from "react-bootstrap";
import RegionFilter from "./RegionMap/RegionFilter";
import DateFilter from "./DateFilter";
import ClassFilter from "./ClassFilter";
import FlagFilter from "./FlagFilter";
import TagsFilter from "./TagsFilter";
import TypeFilter from "./TypeFilter";

const FilterTab: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
	return (
		<>
			<div id="example-collapse-text">
				<Card>
					<Card.Body>
						<Form>
							<RegionFilter isOpen={isOpen} />
							<DateFilter />
							<ClassFilter />
							<TagsFilter />
							<FlagFilter />
							<TypeFilter />
						</Form>
					</Card.Body>
				</Card>
			</div>
		</>
	);
};

export default FilterTab;
