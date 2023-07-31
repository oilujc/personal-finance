
export default class EventEntity {
    id: string;

    userId: string;

    name: string;
    estimatedAmount: number;
    
    eventType: string; // income, expense, reminder
    
    // Recurring
    monthlyRecurring?: boolean;

    status?: string; // active, completed
    isRemiderSended?: boolean;
    isCompleted?: boolean;
    
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id: string,
        userId: string,
        name: string,
        estimatedAmount: number,
        eventType: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.estimatedAmount = estimatedAmount;
        this.eventType = eventType;

        this.monthlyRecurring = false;    
        
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}