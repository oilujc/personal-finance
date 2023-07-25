export default class AccountEntity {
    id: string;
    
    initialAmount: number;
    currentAmount: number;
    totalExpenses: number;
    totalIncomes: number;
    
    totalTransfersIn: number;
    totalTransfersOut: number;

    userId: string;
    isActive: boolean;
    name: string;
    
    createdAt?: Date;
    updatedAt?: Date;


    constructor(
        id: string, 
        initialAmount: number, 
        currentAmount: number, 
        totalExpenses: number, 
        totalIncomes: number, 
        totalTransfersIn: number, 
        totalTransfersOut: number, 
        userId: string, 
        isActive: boolean, 
        name: string, 
        createdAt?: Date, 
        updatedAt?: Date) {
        this.id = id;
        this.initialAmount = initialAmount;
        this.currentAmount = currentAmount;
        this.totalExpenses = totalExpenses;
        this.totalIncomes = totalIncomes;
        this.totalTransfersIn = totalTransfersIn;
        this.totalTransfersOut = totalTransfersOut;
        this.userId = userId;
        this.isActive = isActive;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
   
}
