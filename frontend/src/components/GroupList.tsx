import axios from 'axios';
import React from 'react';
import { FontGroup } from '../Types';

interface GroupListProps {
    groups: FontGroup[];
    onGroupDeleted: (name: string) => void;
    onGroupEdit: (group: FontGroup) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, onGroupDeleted, onGroupEdit }) => {
    const handleDeleteGroup = async (name: string) => {
        try {
            await axios.delete('http://localhost:8000/api/font/groups/', { data: { name } });
            onGroupDeleted(name);
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    return (
        <div className="mb-6 border rounded shadow-md bg-white">
            <h2 className="px-4 text-lg font-bold mb-1">Our Font Groups</h2>
            <p className='px-4 text-sm text-gray-500 mb-4'>List of all available font groups.</p>
            <table className="w-full text-left">
                <thead className='bg-gray-100'>
                    <tr className=''>
                        <th className="px-4 py-2 text-sm">NAME</th>
                        <th className="px-4 py-2 text-sm">FONTS</th>
                        <th className="px-4 py-2 text-sm">COUNT</th>
                        <th className="px-4 py-2 text-sm"></th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <tr key={group.name}>
                            <td className="px-4 border-b py-2">{group.name}</td>
                            <td className="px-4 border-b py-2">
                                {group.fonts.map((font) => font.fontName).join(', ')}
                            </td>
                            <td className="px-4 border-b py-2">{group.fonts.length}</td>
                            <td className="px-4 border-b py-2 flex justify-end">
                                <button
                                    onClick={() => onGroupEdit(group)}
                                    className="text-blue-500 px-4 py-1 rounded hover:text-blue-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteGroup(group.name)}
                                    className="text-red-500 px-4 py-1 rounded hover:text-red-600"
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

export default GroupList;
