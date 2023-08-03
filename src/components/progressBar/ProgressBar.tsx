import React, { useState } from "react";
import "./ProgressBar.css";


interface ProgressBarProps {
    progress: number;
    color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {

    return (
        <div className="progress-bar">
            <div className={`progress-bar__progress ${ progress > 100 ? 'complete' : '' }`} style={{ width: `${progress > 100 ? 100 : progress}%` }}>
                <span className="progress-bar__progress__label">{progress}%</span>
            </div>
        </div>
    );
}

export default ProgressBar;
