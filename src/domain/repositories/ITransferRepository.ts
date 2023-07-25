import TransferEntity from "../entities/TransferEntity";

export default interface ITransferRepository {
    
    create(transfer: TransferEntity): Promise<TransferEntity>;

    update(transfer: TransferEntity): Promise<TransferEntity>;

    delete(id: string): Promise<boolean>;

    getById(id: string): Promise<TransferEntity | null>;

    find(
        qs: any,
    ): Promise<TransferEntity[]>;

}