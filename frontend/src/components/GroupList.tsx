import axios from 'axios';
import React from 'react';
import { FontGroup } from '../Types';

interface GroupListProps {
    groups: FontGroup[];
    onGroupDeleted: (name: string) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, onGroupDeleted }) => {
    const handleDeleteGroup = async (name: string) => {
        try {
            await axios.delete('http://localhost:8000/api/font/groups/', { data: { name } });
            onGroupDeleted(name);
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    return (
        <div className="mb-6 p-4 border rounded shadow-md bg-white">
            <h2 className="text-lg font-bold mb-4">Font Groups</h2>
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="border-b py-2">Name</th>
                        <th className="border-b py-2">Fonts</th>
                        <th className="border-b py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <tr key={group.name}>
                            <td className="border-b py-2">{group.name}</td>
                            <td className="border-b py-2">{group.fonts.join(', ')}</td>
                            <td className="border-b py-2">
                                <button
                                    onClick={() => handleDeleteGroup(group.name)}
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

export default GroupList;
