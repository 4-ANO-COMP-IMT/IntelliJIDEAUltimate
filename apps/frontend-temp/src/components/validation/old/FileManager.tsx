import React, { useState, useEffect, useRef, useCallback } from 'react';
import FileCard from './FileCard';

interface File {
    imgSrc: string;
    fileName: string;
    fileSize: string;
    fileDate: string;
}

const generateRandomImageUrl = () => `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 10000)}`;

const initialFileData: File[] = [
    {
        imgSrc: generateRandomImageUrl(),
        fileName: 'newfile2.jpg',
        fileSize: '4MB',
        fileDate: 'Feb 20, 2019'
    },
    // Adicione mais arquivos conforme necessário
];

const FileManager: React.FC = () => {
    const [fileData, setFileData] = useState<File[]>(initialFileData);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const loadMoreFiles = useCallback(() => {
        setIsLoading(true);

        // Simulate fetching more data
        setTimeout(() => {
            const moreFiles = [
                {
                    imgSrc: generateRandomImageUrl(),
                    fileName: 'newfile1.jpg',
                    fileSize: '3MB',
                    fileDate: 'Jan 10, 2018'
                },
                {
                    imgSrc: generateRandomImageUrl(),
                    fileName: 'newfile2.jpg',
                    fileSize: '4MB',
                    fileDate: 'Feb 20, 2019'
                },
                // Add more files as needed
            ];
            setFileData((prevFiles) => [...prevFiles, ...moreFiles]);
            setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    loadMoreFiles();
                }
            },
            {
                root: null,
                rootMargin: '600px', // Trigger loading when 600px away from the bottom
                threshold: 1.0
            }
        );

        if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [isLoading, loadMoreFiles]);

    return (
        <div id="main-content" className="file_manager">
            <div className="container">
                <div className="row clearfix">
                    {fileData.map((file, index) => (
                        <FileCard
                            key={index}
                            imgSrc={file.imgSrc}
                            fileName={file.fileName}
                            fileSize={file.fileSize}
                            fileDate={file.fileDate}
                        />
                    ))}
                </div>
                {isLoading && <div>Loading...</div>}
                <div ref={loadMoreRef} style={{ height: 20 }} />
            </div>
        </div>
    );
}

export default FileManager;
