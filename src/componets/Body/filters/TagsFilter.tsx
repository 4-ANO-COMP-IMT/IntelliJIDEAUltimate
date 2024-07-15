import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

const tagOptions = [
    { value: 'Tag1', label: 'Tag 1' },
    { value: 'Tag2', label: 'Tag 2' },
    { value: 'Tag3', label: 'Tag 3' },
    // Adicione mais opções conforme necessário
];

const TagsFilter: React.FC = () => {
    const [selectedTags, setSelectedTags] = useState<any[]>([]);

    return (
        <Form.Group controlId="tagsFilter">
            <Form.Label>Tags Especiais</Form.Label>
            <Select
                isMulti
                options={tagOptions}
                value={selectedTags}
                onChange={(newValue: any, actionMeta: any) => setSelectedTags(newValue as any[])}
                placeholder="Digite as tags"
            />
        </Form.Group>
    );
};

export default TagsFilter;
