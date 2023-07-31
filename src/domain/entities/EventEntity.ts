
export default class EventEntity {
    id: string;

    userId: string;

    name: string;
    estimatedAmount: number;
    date: string;

    eventType: string; // income, expense, reminder
    sendReminder: boolean;
    
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
        date: string,
        eventType: string,
        sendReminder: boolean,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.estimatedAmount = estimatedAmount;
        this.date = date;
        this.eventType = eventType;
        this.sendReminder = sendReminder;        
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}