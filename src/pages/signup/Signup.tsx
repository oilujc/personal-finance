import React, { useContext } from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';

import { useForm, Controller } from 'react-hook-form';

import { IonButton, IonInput, IonItem, IonLabel, IonRow, IonCol } from '@ionic/react';

import { useService } from '../../hooks/serviceHook';
import { useHistory } from 'react-router';
import { AuthContext } from '../../context/authContext';


const Signup: React.FC = () => {

    const { control, handleSubmit } = useForm();
    const { authService } = useService();

    const [ present ] = useIonToast();

    const router = useHistory();
    const { setUser } = useContext(AuthContext);

    const onSubmit = async (data: any) => {

        const { email, password , firstName, lastName } = data;

        try {
            const user = await authService.signup(email, password, firstName, lastName);

            if (user) {
                present({
                    message: 'Usuario creado correctamente',
                    duration: 3000,
                    position: 'bottom'
                })

                setUser(user);
            }

        } catch (error: any) {
            present({
                message: error,
                duration: 3000,
                position: 'bottom'
            })
        }

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login" />
                    </IonButtons>
                    <IonTitle>Registro de usuario</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Registro de usuario</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonRow>
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position="floating">Correo</IonLabel>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <IonInput
                                            onIonChange={onChange}
                                            onIonBlur={onBlur}
                                            value={value}
                                            type="email"
                                        />
                                    )}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Contraseña</IonLabel>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <IonInput
                                            onIonChange={onChange}
                                            onIonBlur={onBlur}
                                            value={value}
                                            type="password"
                                        />
                                    )}
                                />


                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Nombre</IonLabel>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <IonInput
                                            onIonChange={onChange}
                                            onIonBlur={onBlur}
                                            value={value}
                                            type="text"
                                        />
                                    )}
                                />


                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Apellido</IonLabel>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <IonInput
                                            onIonChange={onChange}
                                            onIonBlur={onBlur}
                                            value={value}
                                            type="text"
                                        />
                                    )}
                                />


                            </IonItem>


                        </IonCol>

                        <IonCol size='12'>
                            <IonButton type="submit" expand='block' >Registrarse</IonButton>
                        </IonCol>
                    </IonRow>
                </form>




            </IonContent>
        </IonPage>
    );
};

export default Signup;
