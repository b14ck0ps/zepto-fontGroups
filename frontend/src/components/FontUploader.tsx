import React, { useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import axios from 'axios';

interface FontUploaderProps {
    onFontUploaded: () => void;
}

const FontUploader: React.FC<FontUploaderProps> = ({ onFontUploaded }) => {
    const [error, setError] = useState<string | null>(null);

    const onDrop = async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (fileRejections.length > 0) {
            setError('Only .ttf files are allowed.');
            return;
        }

        if (acceptedFiles.length > 0) {
            const formData = new FormData();
            formData.append('font', acceptedFiles[0]);

            try {
                await axios.post('http://localhost:8000/api/font/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                onFontUploaded();
                setError(null);
            } catch (error) {
                setError('An error occurred while uploading the font.');
                console.error('Upload error:', error);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'font/ttf': ['.ttf'] },
    });

    return (
        <div {...getRootProps()} className="mb-6 p-4 border rounded shadow-md bg-white">
            <input {...getInputProps()} type="file" accept=".ttf" style={{ display: 'none' }} />
            <h2 className="text-lg font-bold mb-4">Upload Fonts</h2>
            <div className="text-center border-dashed border-2 p-4">
                Drag and drop your .ttf file here, or click to select a file.
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default FontUploader;
