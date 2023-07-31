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
        { name: 'Recordatorio', value: 'reminder' }
    ];

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
        const [year, month, day] = data.date.toString().split('-');
        const dateFormatted = `${day}-${month}-${year}`;

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
            dateFormatted,
            data.eventType,
            data.sendReminder
        );

        if (defaultValue) {
            event = defaultValue;

            event.name = data.name;
            event.estimatedAmount = estimatedAmount;
            event.date = dateFormatted;
            event.eventType = data.eventType;
            event.sendReminder = data.sendReminder;
            
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
                            {defaultValue ? 'Editar cuenta' : 'Nueva cuenta'}
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
                                Fecha
                            </IonLabel>
                            <Controller
                                name="date"
                                control={control}
                                defaultValue={defaultValue ? defaultValue.date : ''}
                                rules={{ required: true }}
                                render={({ field: { onChange, value, onBlur } }) => <IonInput onIonChange={onChange} value={value} onIonBlur={onBlur} type="date" />}
                            />
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

                        <IonItem>
                            <IonLabel>
                                ¿Enviar recordatorio?
                            </IonLabel>
                            <Controller
                                name="sendReminder"
                                control={control}
                                defaultValue={defaultValue ? defaultValue.sendReminder : true}
                                render={({ field: { onChange, value } }) => <IonCheckbox 
                                    onIonChange={({detail: { checked }}) => onChange(checked ? true : false)}
                                    checked={value}
                                    labelPlacement="end" />}
                                />
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