import React, { PropsWithChildren } from 'react';
import './ExploreContainer.css';


const ExploreContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};

export default ExploreContainer;
