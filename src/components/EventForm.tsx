import { IonButton, IonCheckbox, IonCol, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonText, useIonToast } from "@ionic/react";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import EventEntity from "../domain/entities/EventEntity";
import { AuthContext } from "../context/authContext";
import { useService } from "../hooks/serviceHook";



interface EventFormProps {
    defaultValue?: EventEntity | null;
    callback?: (data?: any) => Promise<void>;
}

const EventForm: React.FC<EventFormProps> = ({ defaultValue, callback }) => {

    const {
        control,
        register,
        handleSubmit,
    } = useForm();

    const [present] = useIonToast();

    const { eventService } = useService();
    const { user } = useContext(AuthContext);

    const eventTypes: any[] = [
        { name: 'Ingreso', value: 'income' },
        { name: 'Gasto', value: 'expense' },
        { name: 'Transferencia', value: 'transfer'},
        { name: 'Recordatorio', value: 'reminder' }
    ];

    // Get active months
    const getMonths = () => {
        const months: any[] = [
            { name: 'Todos los meses', value: 'all' }
        ];
        const monthNames: string[] = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
        ];

        // get current month
        const currentMonth = new Date().getMonth();

        for (let i = currentMonth; i < 11; i++) {
            months.push({
                name: monthNames[i],
                value: monthNames[i].toLowerCase()
            });
        }
        
        return months;
    }

    const newEvent = async (value: EventEntity) => {
        try {
            const result = await eventService.create(value);

            if (callback !== undefined) {
                await callback({
                    Event: result
                });
            }

            present({
                message: 'Cuenta creada correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            console.log(error);

            present({
                message: 'Error al crear la Cuenta',
                duration: 3000,
                position: 'bottom'
            })
        }
    }

    const updateEvent = async (value: EventEntity) => {

        try {
            const result = await eventService.update(value);

            if (callback !== undefined) {
                await callback({
                    Event: result
                });
            }

            present({
                message: 'Cuenta actualizada correctamente',
                duration: 3000,
                position: 'bottom'
            })

        } catch (error) {
            console.log(error);

            present({
                message: 'Error al actualizar la cuenta',
                duration: 3000,
                position: 'bottom'
            })
        }


    }


    const onSubmit = async (data: any) => {

        const estimatedAmount: number = parseFloat(data.estimatedAmount);


        // userId: string,
        // name: string,
        // estimatedAmount: number,
        // date: string,
        // eventType: string,
        // sendReminder: boolean,


        let event = new EventEntity(
            '',
            user?.id || '',
            data.name,
            estimatedAmount,
            data.eventRecurrence,
            data.eventType,
            data.sendReminder
        );

        if (defaultValue) {
            event = defaultValue;

            event.name = data.name;
            event.estimatedAmount = estimatedAmount;
            event.eventType = data.eventType;
            
        }

        if (!defaultValue) {
            newEvent(event);
        } else {
            updateEvent(event);
        }


    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                    <IonCol size='12' className="ion-padding-vertical ion-text-center">
                        <IonText>
                            {defaultValue ? 'Editar cuenta' : 'Nuevo evento'}
                        </IonText>
                    </IonCol>
                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Nombre
                            </IonLabel>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue={defaultValue ? defaultValue.name : ''}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput onIonChange={onChange} value={value} onIonBlur={onBlur} type="text" />}
                            />
                        </IonItem>
                    </IonCol>
                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Monto estimado
                            </IonLabel>
                            <Controller
                                name="estimatedAmount"
                                control={control}
                                defaultValue={0}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput onIonChange={onChange} value={value} onIonBlur={onBlur} type="number" />}
                            />
                        </IonItem>
                    </IonCol>

                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Mes
                            </IonLabel>
                            <IonSelect label="Mes" placeholder="Selecciona un mes"
                                {...register("eventRecurrence", { required: true })}>

                                {
                                    getMonths().map((eventType: any, index: number) => (
                                        <IonSelectOption key={index} value={eventType.value}>{eventType.name}</IonSelectOption>
                                    ))
                                }
                            </IonSelect>
                        </IonItem>
                    </IonCol>

                    <IonCol size='12'>
                        <IonItem>
                            <IonLabel>
                                Tipo de evento
                            </IonLabel>
                            <IonSelect label="Tipo de Evento" placeholder="Selecciona un tipo"
                                {...register("eventType", { required: true })}>

                                {
                                    eventTypes.map((eventType: any, index: number) => (
                                        <IonSelectOption key={index} value={eventType.value}>{eventType.name}</IonSelectOption>
                                    ))
                                }
                            </IonSelect>
                        </IonItem>
                    </IonCol>

                    <IonCol size='12'>
                        <IonButton type="submit" expand='block' >Guardar</IonButton>
                    </IonCol>

                </IonRow>
            </form>
        </>
    );
}

export default EventForm;