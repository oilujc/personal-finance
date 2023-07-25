import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonModal, IonText } from '@ionic/react';

interface SliderItem {
    id: string;
    name: string;
    description?: string;
    color?: string;
    callback?: () => void;
}

interface SliderProps {
    data: Array<SliderItem>;
    title?: string;
    titleSingle?: string;
    newTitle?: string;
    wNew?: boolean;
    newForm?: React.ReactNode;
    onSaved?: () => void;
}


const Slider: React.FC<SliderProps> = ({ data, wNew = false, title = null, titleSingle = null, newTitle = 'Nueva', newForm = null, onSaved }) => {

    const modal = useRef<HTMLIonModalElement>(null);
    const [onOpen, setOnOpen] = useState<boolean>(false);

    const handleCloseModal = () => {

        if (onSaved) {
            onSaved();
        }
        
        setOnOpen(false);
    }



    return (
        <>
            {
                title && (
                  <div className="ion-padding-horizontal">
                        <IonText>
                            <h5 className='ion-no-margin'>{title}</h5>
                        </IonText>
                  </div>
                )
            }


            <Swiper
                spaceBetween={1}
                slidesPerView={2.3}
            >
                {
                    data.map((item, index) => {
                        return (
                            <SwiperSlide key={`slide_${index}`}>
                                <IonCard color={item?.color ? item.color : 'primary'} style={{ height: '85px' }} onClick={() => item.callback?.()}>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            <IonText>
                                                <h5>{item.name}</h5>
                                            </IonText>
                                        </IonCardTitle>

                                        {
                                            item.description && (
                                                <IonCardSubtitle>{item.description}</IonCardSubtitle>
                                            )
                                        }
                                    </IonCardHeader>
                                </IonCard>
                            </SwiperSlide>
                        );
                    })
                }

                {
                    wNew && (
                        <SwiperSlide>
                            <IonCard color="light" style={{ height: '85px' }} onClick={() => setOnOpen(true)}>
                                <IonCardHeader>
                                    <IonText color="primary">
                                        <h6 style={{ marginTop: '0px', marginBottom: '0px' }}> {newTitle} {titleSingle ? titleSingle : 'Item'}</h6>
                                    </IonText>
                                </IonCardHeader>
                            </IonCard>
                        </SwiperSlide>
                    )
                }

            </Swiper>

            <IonModal ref={modal}
                onDidDismiss={() => setOnOpen(false)}
                isOpen={onOpen}
                initialBreakpoint={0.50}
                breakpoints={[0, 0.50]}
                handleBehavior="cycle">

                {
                    newForm && (
                        React.cloneElement(newForm as React.ReactElement<any>, { callback: handleCloseModal })
                    )
                }                

            </IonModal>

        </>
    );
}

export default Slider;