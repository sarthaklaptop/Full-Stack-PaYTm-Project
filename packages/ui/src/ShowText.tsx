"use client"

import React from "react";

interface ShowTextProps {
    text: string;
    icon?: React.ReactNode;
}

// @ts-ignore
export const ShowText : React.FC<ShowTextProps> = ({text, icon = null}) => {

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
    };
    

    return (
        <div className="flex items-center">
            <span>{text}</span>
            { icon && (
                <button 
                onClick={copyToClipboard}
                className="ml-2 px-2 py-1 text-sm  rounded flex items-center space-x-1"
                
                >
                    <span>{icon}</span>
                    <span>Copy</span>
                </button>
            )}
        </div>
    )
}