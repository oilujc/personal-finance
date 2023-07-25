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
}



export default class TransferService {
    private transferRepository: ITransferRepository;
    private accountRepository: IAccountRepository;


    constructor(
        transferRepository: ITransferRepository,
        accountRepository: IAccountRepository,
    ) {
        this.transferRepository = transferRepository;
        this.accountRepository = accountRepository;
    }

    public async create(transferCreate: TransferCreateDTO): Promise<TransferEntity> {

        const { fromAccount, toAccount, amount, userId } = transferCreate;
        

        if (amount <= 0) {
            throw new Error("transfer/invalid-amount");
        }

        if (fromAccount.currentAmount < amount) {
            throw new Error("transfer/insufficient-funds");
        }
        
        const fromCurrentAmount: number = fromAccount.currentAmount - amount;
        const fromTotalTransfersOut: number = fromAccount.totalTransfersOut + amount;

        fromAccount.currentAmount = fromCurrentAmount;
        fromAccount.totalTransfersOut = fromTotalTransfersOut;

        const toCurrentAmount: number = toAccount.currentAmount + amount;
        const toTotalTransfersIn: number = toAccount.totalTransfersIn + amount;

        toAccount.currentAmount = toCurrentAmount;
        toAccount.totalTransfersIn = toTotalTransfersIn;

        await this.accountRepository.update(fromAccount);
        await this.accountRepository.update(toAccount);

        const transfer = new TransferEntity(
            '',
            fromAccount.id,
            toAccount.id,
            userId,
            amount,
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