import React, { useState } from 'react';
import ImageModal from './ImageModal';

interface FileCardProps {
    imgSrc: string;
    fileName: string;
    fileSize: string;
    fileDate: string;
}

const FileCard: React.FC<FileCardProps> = ({ imgSrc, fileName, fileSize, fileDate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <>
            <div className="col-lg-3 col-md-4 col-sm-12">
                <div className="card">
                    <div className="file">
                        <a href="javascript:void(0);" onClick={toggleModal}>
                            <div className="hover">
                                <button type="button" className="btn btn-icon btn-danger">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                            <div className="image">
                                <img src={imgSrc} alt="img" className="img-fluid" />
                            </div>
                            <div className="file-name">
                                <p className="m-b-5 text-muted">{fileName}</p>
                                <small>Size: {fileSize} <span className="date text-muted">{fileDate}</span></small>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <ImageModal isOpen={isModalOpen} toggle={toggleModal} imgSrc={imgSrc} />
        </>
    );
}

export default FileCard;
