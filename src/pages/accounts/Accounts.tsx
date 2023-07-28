import React, { useContext, useRef, useState } from 'react';
import { IonBackButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonNote, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { add, chevronBackCircle, repeatOutline } from 'ionicons/icons';
import { useService } from '../../hooks/serviceHook';
import { AuthContext } from '../../context/authContext';
import AccountForm from '../../components/AccountForm';
import AccountEntity from '../../domain/entities/AccountEntity';
import TransferForm from '../../components/transferForm/TransferForm';


const Accounts: React.FC = () => {

    const { accountService } = useService();
    const { user } = useContext(AuthContext);

    const [accounts, setAccounts] = useState<AccountEntity[]>([]);
    const [account, setAccount] = useState<AccountEntity | null>(null);

    const [action, setAction] = useState<string>('create'); // ['create', 'update', 'transfer'


    const [onOpenModal, setOnOpenModal] = useState(false);

    const modal = useRef<HTMLIonModalElement>(null);

    const [present] = useIonToast();
    const [presentAlert] = useIonAlert();

    const getAccounts = async () => {
        const data = await accountService.find({
            userId: {
                constraint: 'eq',
                value: user?.id
            }
        });

        setAccounts(data);
    }

    const onSave = async (data?: any) => {
        await getAccounts();

        setAccount(null);
        setOnOpenModal(false);
    }

    const onDelete = async (id: string) => {
        await presentAlert({
            header: 'Eliminar',
            message: '¿Está seguro de eliminar esta cuenta?',
            buttons: [
                'Cancelar',
                {
                    text: 'Eliminar',
                    handler: async () => {

                        try {

                            await accountService.delete(id);

                            await getAccounts();

                            present({
                                message: 'Cuenta eliminada correctamente',
                                duration: 3000,
                                position: 'bottom'
                            })

                        } catch (error) {
                            console.log(error);

                            present({
                                message: 'Error al eliminar la cuenta',
                                duration: 3000,
                                position: 'bottom'
                            })
                        }

                    }
                }
            ]
        });
    }

    const onCreate = async () => {
        setAccount(null);
        setAction('create');
        setOnOpenModal(true);
    }

    const onEdit = async (account: AccountEntity) => {
        setAccount(account);
        setOnOpenModal(true);
    }

    const onTransfer = async () => {
        setAccount(null);
        setAction('transfer');
        setOnOpenModal(true);
    }

    useIonViewWillEnter(() => {
        getAccounts();
    });


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Cuentas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Cuentas</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonList>
                                {accounts.map((account, index) => (
                                    <IonItemSliding key={index}>
                                        <IonItem >
                                            <IonLabel>
                                                {account.name}
                                            </IonLabel>
                                            <IonNote slot="end" color="primary">
                                                <IonText><h3 style={{ margin: 0 }}>{account.currentAmount} $</h3></IonText>
                                            </IonNote>
                                        </IonItem>
                                        <IonItemOptions>
                                            <IonItemOption color="primary" expandable
                                                onClick={() => onEdit(account)} >Edit</IonItemOption>
                                            <IonItemOption color="danger" expandable
                                                onClick={() => onDelete(account.id)} >Delete</IonItemOption>
                                        </IonItemOptions>
                                    </IonItemSliding>
                                ))}
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>


                <IonFab vertical="bottom" horizontal="end" slot="fixed" >
                    <IonFabButton size='small'>
                        <IonIcon icon={chevronBackCircle}></IonIcon>
                    </IonFabButton>
                    <IonFabList side="start">
                        <IonFabButton onClick={() => onCreate()}>
                            <IonIcon icon={add}></IonIcon>
                        </IonFabButton>
                        <IonFabButton onClick={() => onTransfer()}>
                            <IonIcon icon={repeatOutline}></IonIcon>
                        </IonFabButton>
                    </IonFabList>
                </IonFab>

                <IonModal ref={modal}
                    onDidDismiss={() => setOnOpenModal(false)}
                    isOpen={onOpenModal}
                    initialBreakpoint={0.50}
                    breakpoints={[0, 0.50]}
                    handleBehavior="cycle">

                        {
                            (action === 'create' || action === 'update') && (
                                <AccountForm callback={onSave}
                                    defaultValue={account}
                                />
                            )
                        }

                        {
                            (action === 'transfer') && (
                                <TransferForm callback={onSave}
                                    accounts={accounts}
                                />
                            )
                        }
                        
                </IonModal>



            </IonContent>
        </IonPage>
    );
};

export default Accounts;
