import EventEntity from "../../domain/entities/EventEntity";
import IEventRepository from "../../domain/repositories/IEventRepository";

export default class LocalEventRepository implements IEventRepository {
    private collectionName = "events";

    // userId: string,
    // name: string,
    // estimatedAmount: number,
    // date: string,
    // eventType: string, // income, expense, reminder
    // sendReminder: boolean,

    create(event: EventEntity): Promise<EventEntity> {
        return new Promise((resolve, reject) => {
            resolve(event);
        });
    }
    update(event: EventEntity): Promise<EventEntity> {
        return new Promise((resolve, reject) => {
            resolve(event);
        });
    }
    delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
    getById(id: string): Promise<EventEntity | null> {
        return new Promise((resolve, reject) => {
            resolve(null);
        });
    }
    find(qs: any): Promise<EventEntity[]> {
        return new Promise((resolve, reject) => {

            // const randomDates = (start: Date, end: Date, n: number) : string => {

            //     // format d-m-Y

            //     const date = new Date(
            //         start.getTime() + Math.random() * (end.getTime() - start.getTime())
            //     );

            //     const day = date.getDate();
            //     const month = date.getMonth() + 1;
            //     const year = date.getFullYear();

            //     return `${day}-${month}-${year}`;
            // }

            const randomEventTypes = () : string => {
                const eventTypes = ['income', 'expense', 'reminder'];

                return eventTypes[Math.floor(Math.random() * eventTypes.length)];
            }

            const randomReminder = () : boolean => {
                const reminders = [true, false];

                return reminders[Math.floor(Math.random() * reminders.length)];
            }

            const entities: EventEntity[] = [];

            for (let i = 0; i < 5; i++) {
                const entity = new EventEntity(
                    "1",
                    "1",
                    `Event ${i}`,
                    100,
                    randomEventTypes(),
                    new Date(),
                    new Date(),
                );

                entities.push(entity);
            }

            resolve(entities);
        });
    }

}