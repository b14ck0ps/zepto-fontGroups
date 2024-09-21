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
            <h2 className="text-lg font-bold">Our Fonts</h2>
            <p className='text-gray-500 text-sm'>Browser a list of Zepto fonts to build your group.</p>
            <table className="w-full text-left mt-3">
                <thead className='bg-gray-100'>
                    <tr>
                        <th className="px-2 text-sm">FONT NAME</th>
                        <th className="px-2 text-sm">PREVIEW</th>
                        <th className="py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {fonts.map((font) => (
                        <tr key={font}>
                            <td className="border-b p-2">{font}</td>
                            <td className="border-b p-2" style={{ fontFamily: font }}>Example Style</td>
                            <td className="border-b p-2">
                                <button
                                    onClick={() => handleDeleteFont(font)}
                                    className="text-red-500 px-4 py-1 hover:text-red-600"
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
