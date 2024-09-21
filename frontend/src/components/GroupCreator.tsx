import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontGroup } from '../Types';

interface GroupFont {
    fontName: string;
    font: string;
    size: number;
    price: number;
}

interface Font {
    name: string;
}

interface GroupCreatorProps {
    onGroupCreated: () => void;
    groupToEdit?: FontGroup | null;
    onGroupUpdated?: () => void;
}

const GroupCreator: React.FC<GroupCreatorProps> = ({ onGroupCreated, groupToEdit, onGroupUpdated }) => {
    const [groupName, setGroupName] = useState('');
    const [fonts, setFonts] = useState<Font[]>([]);
    const [groupFonts, setGroupFonts] = useState<GroupFont[]>([{ fontName: '', font: '', size: 0, price: 0 }]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchFonts();
    }, []);

    useEffect(() => {
        if (groupToEdit) {
            setGroupName(groupToEdit.name);
            setGroupFonts(groupToEdit.fonts.map(font => ({
                fontName: font.fontName,
                font: font.font,
                size: font.size,
                price: font.price,
            })));
            setIsEditing(true);
        } else {
            resetForm();
        }
    }, [groupToEdit]);

    const fetchFonts = async () => {
        const response = await axios.get<{ fonts: string[] }>('http://localhost:8000/api/font/');
        setFonts(response.data.fonts.map((fontName) => ({ name: fontName })));
    };

    const handleAddGroupRow = () => {
        setGroupFonts([...groupFonts, { fontName: '', font: '', size: 0, price: 0 }]);
    };

    const handleGroupChange = (index: number, key: keyof GroupFont, value: string | number) => {
        const updatedFonts = [...groupFonts];
        updatedFonts[index] = { ...updatedFonts[index], [key]: value };
        setGroupFonts(updatedFonts);
    };

    const resetForm = () => {
        setGroupName('');
        setGroupFonts([{ fontName: '', font: '', size: 0, price: 0 }]);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        resetForm();
    };

    const handleSubmit = async () => {
        if (!groupName || groupFonts.filter((f) => f.fontName && f.font).length < 2) {
            alert("Please provide at least two rows with font names and selected fonts for the group.");
            return;
        }

        const groupData = {
            name: groupName,
            fonts: groupFonts.filter((f) => f.fontName && f.font),
        };

        try {
            if (isEditing && groupToEdit) {
                await axios.put('http://localhost:8000/api/font/groups/', {
                    oldName: groupToEdit.name, ...groupData,
                });

                if (onGroupUpdated) {
                    onGroupUpdated();
                }
            } else {
                await axios.post('http://localhost:8000/api/font/groups/', groupData);
                onGroupCreated();
            }

            resetForm();
        } catch (error) {
            console.error('Error submitting group:', error);
        }
    };

    return (
        <div className="mb-6 p-4 border rounded shadow-md bg-white">
            <h2 className="text-lg font-bold mb-4">
                {isEditing ? 'Edit Font Group' : 'Create Font Group'}
            </h2>

            <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
                className="border rounded p-2 mb-4 w-full"
            />

            {groupFonts.map((groupFont, index) => (
                <div key={index} className="mb-4 grid grid-cols-4 gap-4">
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
                </div>
            ))}

            <button
                onClick={handleAddGroupRow}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            >
                Add Row
            </button>
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {isEditing ? 'Update Group' : 'Create Group'}
            </button>
            {isEditing && (
                <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                >
                    Cancel
                </button>
            )}
        </div>
    );
};

export default GroupCreator;
