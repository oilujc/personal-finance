import EventEntity from "../entities/EventEntity";

export default interface IEventRepository {
    
    create(event: EventEntity): Promise<EventEntity>;

    update(event: EventEntity): Promise<EventEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<EventEntity | null>;

    find(
        qs: any,
    ): Promise<EventEntity[]>;

}