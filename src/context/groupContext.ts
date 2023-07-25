import { createContext } from 'react';
import GroupEntity from '../domain/entities/GroupEntity';

interface IGroupContext {
    group: GroupEntity | null;
    setGroup: (group: GroupEntity | null) => void;
}

export const GroupContext = createContext<IGroupContext>({
    group: null,
    setGroup: (group: GroupEntity | null) => {
        throw new Error('setGroup function must be overridden');
    }
});
