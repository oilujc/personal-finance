import FirebaseGroupRepository from "../infrastructure/firebase/impl/FirebaseGroupRepository";
import GroupService from "../usecases/GroupService";


export const useGroup = () => {
    const groupService = new GroupService(
        new FirebaseGroupRepository()
    );

    return {
        groupService,
    }
}