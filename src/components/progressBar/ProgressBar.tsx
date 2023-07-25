import React, { useState } from "react";
import "./ProgressBar.css";


interface ProgressBarProps {
    progress: number;
    color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {


    const getFontColor = () => {
        if (progress > 50) {
            return "light";
        }

        return "dark";
    }


    return (
        <div className="progress-bar">
            <div className="progress-bar__progress" style={{ width: `${progress}%` }}>
                <span className="progress-bar__progress__label">{progress}%</span>
            </div>
        </div>
    );
}

export default ProgressBar;
