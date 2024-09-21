import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FontUploader from './FontUploader';
import FontList from './FontList';
import GroupCreator from './GroupCreator';
import GroupList from './GroupList';
import { ApiResponse, FontGroup } from '../Types';

const FontManager: React.FC = () => {
    const [fonts, setFonts] = useState<string[]>([]);
    const [groups, setGroups] = useState<FontGroup[]>([]);

    useEffect(() => {
        fetchFonts();
        fetchGroups();
    }, []);

    const fetchFonts = async () => {
        const response = await axios.get<ApiResponse<string[]>>('http://localhost:8000/api/font/');
        if (Array.isArray(response.data.fonts)) {
            setFonts(response.data.fonts);
        }
    };

    const fetchGroups = async () => {
        const response = await axios.get<ApiResponse<FontGroup[]>>('http://localhost:8000/api/font/groups/');
        if (Array.isArray(response.data.groups)) {
            setGroups(response.data.groups);
        }
    };

    const handleFontUploaded = () => {
        fetchFonts();
    };

    const handleGroupCreated = () => {
        fetchGroups();
    };

    const handleFontDeleted = (font: string) => {
        setFonts(fonts.filter(f => f !== font));
    };

    const handleGroupDeleted = (name: string) => {
        setGroups(groups.filter(group => group.name !== name));
    };

    return (
        <div>
            <FontUploader onFontUploaded={handleFontUploaded} />
            <FontList fonts={fonts} onFontDeleted={handleFontDeleted} />
            <GroupCreator onGroupCreated={handleGroupCreated} />
            <GroupList groups={groups} onGroupDeleted={handleGroupDeleted} />
        </div>
    );
};

export default FontManager;
