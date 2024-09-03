import { Classification } from '../../interfaces.ts';

export const createClassification = function (req, res) {
    let classification: Classification = req.body;
}

export const getClassificationById = function (req, res) {
    // Lógica para lidar com requisições GET para /classification/:id
    // Buscar uma classificação específica por ID
    const { id } = req.params;

}