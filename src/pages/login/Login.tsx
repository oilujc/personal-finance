import React, { useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';


import { useForm, Controller } from 'react-hook-form';

import { IonButton, IonInput, IonItem, IonLabel, IonRow, IonCol } from '@ionic/react';

import './Login.css';
import { AuthContext } from '../../context/authContext';
import { useService } from '../../hooks/serviceHook';
import { Link } from 'react-router-dom';


const Login: React.FC = () => {

    const { control, handleSubmit } = useForm();
    const { authService } = useService();

    const [ present ] = useIonToast();

    const { setUser } = useContext(AuthContext);

    const onSubmit = async (data: any) => {

        const { email, password } = data;

        try {
            const user = await authService.login(email, password);

            if (user) {
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
                    <IonTitle>Iniciar sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Iniciar sesión</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonRow>
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position="floating">Email</IonLabel>
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
                                <IonLabel position="floating">Password</IonLabel>
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
                        </IonCol>

                        <IonCol size='12'>
                            <IonText>
                                <p>¿No tienes cuenta? <Link to='/signup'>Regístrate</Link></p>
                            </IonText>
                        </IonCol>

                        <IonCol size='12'>
                            <IonButton type="submit" expand='block' >Iniciar sesión</IonButton>
                        </IonCol>
                    </IonRow>
                </form>




            </IonContent>
        </IonPage>
    );
};

export default Login;
