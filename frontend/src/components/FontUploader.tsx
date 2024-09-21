import React, { useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import axios from 'axios';
import { AiOutlineCloudUpload } from 'react-icons/ai';

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
            <div className="text-center border-dashed border-2 p-4 text-gray-500">
                <div className='flex justify-center mb-3'>
                    <AiOutlineCloudUpload className='text-3xl' />
                </div>
                <span className='font-bold'>Click to Upload</span> or Drag and Drop
                <p className='font-light'>Only TTF file allowed</p>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default FontUploader;
