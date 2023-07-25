import React from 'react';
import Slider from './Slider';

const CategorySlider: React.FC = () => {
    return (
        <>
            <Slider
                title="Categorias"
                titleSingle='Categoria'
                data={[
                {
                  id: '1',
                  name: 'Item 1',
                  color: 'primary'
                },
                {
                  id: '2',
                  name: 'Item 2',
                  color: 'secondary'
                },
                {
                  id: '3',
                  name: 'Item 3',
                  color: 'tertiary'
                },
                {
                  id: '4',
                  name: 'Item 4',
                  color: 'success'
                },
              ]} wNew={true} />
        </>
    );
}

export default CategorySlider;