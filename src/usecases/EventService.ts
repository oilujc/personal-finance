import EventEntity from "../domain/entities/EventEntity";
import IEventRepository from "../domain/repositories/IEventRepository";

export default class EventService {

    private eventRepository: IEventRepository;
    constructor(
        eventRepository: IEventRepository,
    ) {
        this.eventRepository = eventRepository;
    }

    create(event: EventEntity): Promise<EventEntity> {
        return this.eventRepository.create(event);
    }

    update(event: EventEntity): Promise<EventEntity> {
        return this.eventRepository.update(event);
    }

    delete(id: string): Promise<boolean> {
        return this.eventRepository.delete(id);
    }

    getById(id: string): Promise<EventEntity | null> {
        return this.eventRepository.getById(id);
    }

    find(
        qs: any,
    ): Promise<EventEntity[]> {
        return this.eventRepository.find(qs);
    }

}