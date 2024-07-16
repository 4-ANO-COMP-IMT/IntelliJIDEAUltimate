import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";

const classOptions = [
        { value: 1, label: "Classe 1" },
        { value: 2, label: "Classe 2" },
        { value: 3, label: "Classe 3" }
        // Adicione mais opções conforme necessário
];

const ClassFilter: React.FC = () => {
        const [selectedClasses, setSelectedClasses] = useState<any[]>([]);

        return (
                <Form.Group controlId="classFilter">
                        <Form.Label>Classe</Form.Label>
                        <Select
                                isMulti
                                options={classOptions}
                                value={selectedClasses}
                                onChange={(newValue, actionMeta) =>
                                        setSelectedClasses(Array.from(newValue))
                                }
                                placeholder="Selecione as classes"
                        />
                </Form.Group>
        );
};

export default ClassFilter;
