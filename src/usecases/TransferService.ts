import AccountEntity from "../domain/entities/AccountEntity";
import TransferEntity from "../domain/entities/TransferEntity";
import UserEntity from "../domain/entities/UserEntity";
import IAccountRepository from "../domain/repositories/IAccountRepository";
import ITransferRepository from "../domain/repositories/ITransferRepository";

interface TransferCreateDTO {
    fromAccount: AccountEntity;
    toAccount: AccountEntity;
    amount: number;
    userId: string;
    amountReceived?: number;
}



export default class TransferService {
    private transferRepository: ITransferRepository;


    constructor(
        transferRepository: ITransferRepository,
    ) {
        this.transferRepository = transferRepository;
    }

    public async create(transferCreate: TransferCreateDTO): Promise<TransferEntity> {

        const { fromAccount, toAccount, amount, userId, amountReceived } = transferCreate;
        

        if (amount <= 0) {
            throw new Error("transfer/invalid-amount");
        }

        if (fromAccount.currentAmount < amount) {
            throw new Error("transfer/insufficient-funds");
        }

        const transfer = new TransferEntity(
            '',
            fromAccount.id,
            toAccount.id,
            userId,
            amount,
            '',
            amountReceived
        );

        return this.transferRepository.create(transfer);
    }

    public async update(transfer: TransferEntity): Promise<TransferEntity> {
        return this.transferRepository.update(transfer);
    }

    public async delete(id: string): Promise<boolean> {
        return this.transferRepository.delete(id);
    }

    public async getById(id: string): Promise<TransferEntity | null> {
        return this.transferRepository.getById(id);
    }

    public async find(qs: any): Promise<TransferEntity[]> {
        return this.transferRepository.find(qs);
    }
}