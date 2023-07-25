import React, { useContext, useEffect, useState } from 'react';
import Slider from './Slider';
import GroupForm from './GroupForm';
import { AuthContext } from '../context/authContext';
import GroupEntity from '../domain/entities/GroupEntity';
import { useHistory } from 'react-router';
import { useService } from '../hooks/serviceHook';


interface GroupSliderProps {
    isRefresh?: boolean;
}

const GroupSlider: React.FC<GroupSliderProps> = ({ isRefresh }) => {

    const [groups, setGroups] = useState<any[]>([]);
    const { groupService } = useService();
    const { user } = useContext(AuthContext);

    const router = useHistory();

    const getGroups = async () => {

        const data = await groupService.find({
            members: {
                constraint: 'contains',
                value: user?.id
            }
        });

        const mappedData = data.map((group: GroupEntity) => {
            return {
                ...group,
                callback: () => {
                    // go to group detail
                    return router.push(`/group/${group.id}`);
                }
            }
        });

        setGroups(mappedData);
    }

    useEffect(() => {
        if (isRefresh) {
            getGroups();
        }
    }, [isRefresh]);


    return (
        <>
            <Slider
                title="Grupos"
                titleSingle='Grupo'
                newTitle='Nuevo'
                data={groups}
                wNew={true}
                newForm={
                    <GroupForm />
                }
                onSaved={getGroups}
            />
        </>
    );
}

export default GroupSlider;