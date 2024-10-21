import React from 'react';
import FileManager from './components/FileManager';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Inclua seu arquivo CSS para estilos adicionais

const App: React.FC = () => {
    return (
        <div className="App">
            <FileManager />
        </div>
    );
}

export default App;
