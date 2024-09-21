import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontGroup } from '../Types';
import { RxCross2 } from 'react-icons/rx';

interface GroupFont {
    fontName: string;
    font: string;
    size: number;
    price: number;
}

interface GroupCreatorProps {
    onGroupCreated: () => void;
    groupToEdit?: FontGroup | null;
    onGroupUpdated?: () => void;
    availableFonts: string[];
    onCancel: () => void;
}

const GroupCreator: React.FC<GroupCreatorProps> = ({ onGroupCreated, groupToEdit, onGroupUpdated, availableFonts, onCancel }) => {
    const [groupName, setGroupName] = useState('');
    const [groupFonts, setGroupFonts] = useState<GroupFont[]>([{ fontName: '', font: '', size: 0, price: 0 }]);
    const [isEditing, setIsEditing] = useState(false);

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

    const handleAddGroupRow = () => {
        setGroupFonts([...groupFonts, { fontName: '', font: '', size: 0, price: 0 }]);
    };

    const handleDeleteGroupRow = (index: number) => {
        const updatedFonts = groupFonts.filter((_, i) => i !== index);
        setGroupFonts(updatedFonts);
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

    const handleCancel = () => {
        resetForm();
        onCancel();
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
            <h2 className="text-lg font-bold mb-1">
                {isEditing ? 'Edit Font Group' : 'Create Font Group'}
            </h2>
            <p className='text-sm text-gray-500 mb-4'>You have to select at least 2 fonts.</p>

            <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Title"
                className="border rounded p-2 mb-4 w-full"
            />

            {groupFonts.map((groupFont, index) => (
                <section key={index} className="mb-4 px-4 py-3 border rounded shadow-md bg-white relative">
                    <button
                        onClick={() => handleDeleteGroupRow(index)}
                        className="absolute top-6 right-4 text-red-500 hover:text-red-600 text-xl"
                    >
                        <RxCross2 />
                    </button>
                    <div className="my-1 grid grid-cols-3 gap-4">
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
                            <option value="">Select a Font</option>
                            {availableFonts.map((font) => (
                                <option key={font} value={font}>
                                    {font}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            value={groupFont.size}
                            onChange={(e) => handleGroupChange(index, 'size', parseFloat(e.target.value))}
                            placeholder="Size"
                            className="border rounded p-2"
                            hidden={true}
                        />

                        <input
                            type="number"
                            value={groupFont.price}
                            onChange={(e) => handleGroupChange(index, 'price', parseFloat(e.target.value))}
                            placeholder="Price"
                            className="border rounded p-2"
                            hidden={true}
                        />
                    </div>
                </section>
            ))}

            <div className='flex justify-between'>
                <button
                    onClick={handleAddGroupRow}
                    className="border border-green-800 px-10 py-1 rounded hover:border-green-900 mr-2"
                >
                    + Add Row
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-green-800 text-white px-10 py-1 rounded hover:bg-green-900"
                >
                    {isEditing ? 'Update Group' : 'Create'}
                </button>
                {isEditing && (
                    <button
                        onClick={handleCancel}
                        className="border border-red-500 text-red-500 px-10 py-1 rounded hover:bg-red-500 hover:text-white"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default GroupCreator;
