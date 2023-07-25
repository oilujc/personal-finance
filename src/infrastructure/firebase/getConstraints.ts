import { WhereFilterOp } from "firebase/firestore";

interface ConstraintsData {
    [key: string]: string;
}

const getContraints = (constraint: string): WhereFilterOp => {
    const constraintsData: ConstraintsData = {
        'eq': '==',
        'contains': 'array-contains',
    };

    if (!constraintsData[constraint]) {
        throw new Error(`Constraint ${constraint} not found`);
    }
    

    return constraintsData[constraint] as WhereFilterOp;
}

export default getContraints;