import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Font {
    name: string;
}

interface GroupFont {
    fontName: string;
    font: string;
    size: number;
    price: number;
}

interface GroupCreatorProps {
    onGroupCreated: () => void;
}

const GroupCreator: React.FC<GroupCreatorProps> = ({ onGroupCreated }) => {
    const [groupName, setGroupName] = useState('');
    const [fonts, setFonts] = useState<Font[]>([]);
    const [groupFonts, setGroupFonts] = useState<GroupFont[]>([{ fontName: '', font: '', size: 0, price: 0 }]);

    useEffect(() => {
        fetchFonts();
    }, []);

    const fetchFonts = async () => {
        const response = await axios.get<{ fonts: string[] }>('http://localhost:8000/api/font/');
        setFonts(response.data.fonts.map((fontName) => ({ name: fontName })));
    };

    const handleAddGroupRow = () => {
        setGroupFonts([...groupFonts, { fontName: '', font: '', size: 0, price: 0 }]);
    };

    const handleDeleteGroupRow = (index: number) => {
        const updatedFonts = groupFonts.filter((_, i) => i !== index);
        setGroupFonts(updatedFonts);
    };

    const handleGroupChange = (
        index: number,
        key: keyof GroupFont,
        value: string | number
    ) => {
        const updatedFonts = [...groupFonts];

        updatedFonts[index] = {
            ...updatedFonts[index],
            [key]: value,
        };

        setGroupFonts(updatedFonts);
    };

    const handleCreateGroup = async () => {
        if (groupName && groupFonts.filter((f) => f.font).length >= 2) {
            await axios.post('http://localhost:8000/api/font/groups/', {
                name: groupName,
                fonts: groupFonts.filter((f) => f.font),
            });

            setGroupName('');
            setGroupFonts([{ fontName: '', font: '', size: 0, price: 0 }]);
            onGroupCreated();
        }
    };

    return (
        <div className="mb-6 p-4 border rounded shadow-md bg-white">
            <h2 className="text-lg font-bold mb-4">Create Font Group</h2>

            <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
                className="border rounded p-2 mb-4 w-full"
            />

            {groupFonts.map((groupFont, index) => (
                <div key={index} className="mb-4 grid grid-cols-5 gap-4">
                    <input
                        type="text"
                        value={groupFont.fontName}
                        onChange={(e) => handleGroupChange(index, 'fontName', e.target.value)}
                        placeholder="Font Name"
                        className="border rounded p-2"
                    />

                    <select
                        value={groupFont.font}
                        onChange={(e) => handleGroupChange(index, 'font', e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="">Select Font</option>
                        {fonts.map((font) => (
                            <option key={font.name} value={font.name}>
                                {font.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        value={groupFont.size}
                        onChange={(e) => handleGroupChange(index, 'size', parseFloat(e.target.value))}
                        placeholder="Size"
                        className="border rounded p-2"
                    />

                    <input
                        type="number"
                        value={groupFont.price}
                        onChange={(e) => handleGroupChange(index, 'price', parseFloat(e.target.value))}
                        placeholder="Price"
                        className="border rounded p-2"
                    />

                    <button
                        onClick={() => handleDeleteGroupRow(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ))}
            <button
                onClick={handleAddGroupRow}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            >
                Add Row
            </button>
            <button
                onClick={handleCreateGroup}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Create Group
            </button>
        </div>
    );
};

export default GroupCreator;
