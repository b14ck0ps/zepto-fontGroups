import React, { useState } from 'react';
import axios from 'axios';

interface GroupCreatorProps {
    onGroupCreated: () => void;
}

const GroupCreator: React.FC<GroupCreatorProps> = ({ onGroupCreated }) => {
    const [groupName, setGroupName] = useState('');
    const [groupFonts, setGroupFonts] = useState<string[]>(['']);

    const handleAddGroupRow = () => {
        setGroupFonts([...groupFonts, '']);
    };

    const handleGroupChange = (index: number, value: string) => {
        const updatedFonts = [...groupFonts];
        updatedFonts[index] = value;
        setGroupFonts(updatedFonts);
    };

    const handleCreateGroup = async () => {
        if (groupName && groupFonts.filter(f => f).length >= 2) {
            await axios.post('http://localhost:8000/api/font/groups/', {
                name: groupName,
                fonts: groupFonts.filter(f => f),
            });

            setGroupName('');
            setGroupFonts(['']);
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
                className="border rounded p-2 mb-2 w-full"
            />
            {groupFonts.map((font, index) => (
                <div key={index} className="mb-2">
                    <input
                        type="text"
                        value={font}
                        onChange={(e) => handleGroupChange(index, e.target.value)}
                        placeholder="Font Name"
                        className="border rounded p-2 w-full"
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
                onClick={handleCreateGroup}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Create Group
            </button>
        </div>
    );
};

export default GroupCreator;
