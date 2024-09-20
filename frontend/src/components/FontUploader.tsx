import React, { useState } from 'react';
import axios from 'axios';

interface FontUploaderProps {
    onFontUploaded: () => void;
}

const FontUploader: React.FC<FontUploaderProps> = ({ onFontUploaded }) => {
    const [fontFile, setFontFile] = useState<File | null>(null);

    const handleFontUpload = async () => {
        if (fontFile) {
            const formData = new FormData();
            formData.append('font', fontFile);

            await axios.post('http://localhost:8000/api/font/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFontFile(null);
            onFontUploaded();
        }
    };

    return (
        <div className="mb-6 p-4 border rounded shadow-md bg-white">
            <h2 className="text-lg font-bold mb-4">Upload Fonts</h2>
            <input
                type="file"
                accept=".ttf"
                className="border rounded p-2 mb-4"
                onChange={(e) => setFontFile(e.target.files?.[0] || null)}
            />
            <button
                onClick={handleFontUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Upload Font
            </button>
        </div>
    );
};

export default FontUploader;
