import React from 'react';
import axios from 'axios';

interface FontListProps {
    fonts: string[];
    onFontDeleted: (font: string) => void;
}

const FontList: React.FC<FontListProps> = ({ fonts, onFontDeleted }) => {
    const handleDeleteFont = async (font: string) => {
        await axios.delete('http://localhost:8000/api/font/', { data: { fontName: font } });
        onFontDeleted(font);
    };

    return (
        <div className="mb-6 p-4 border rounded shadow-md bg-white">
            <h2 className="text-lg font-bold mb-4">Available Fonts</h2>
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="border-b py-2">Name</th>
                        <th className="border-b py-2">Preview</th>
                        <th className="border-b py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fonts.map((font) => (
                        <tr key={font}>
                            <td className="border-b py-2">{font}</td>
                            <td className="border-b py-2" style={{ fontFamily: font }}>Preview</td>
                            <td className="border-b py-2">
                                <button
                                    onClick={() => handleDeleteFont(font)}
                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FontList;
