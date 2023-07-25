import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const usePermission = () => {

    const { permissions } = useContext(AuthContext);

    const hasPermission = (key: string) => {

        const result = permissions.some((p) => p.key === key);

        console.log('result', result, key, permissions)


        return result;
    }

    return {
        hasPermission
    }
}

export default usePermission;