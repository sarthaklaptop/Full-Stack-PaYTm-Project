'use client'; // Ensure this is a client-side component

import React, { useRef } from "react";
import QRCode from "react-qr-code";

export default function QRCodeComponent({ user }: any) {
    const qrCodeRef = useRef(null);

    const downloadQRCode = () => {
        const svg = qrCodeRef.current;
        if (!svg) {
            console.error("QR Code not rendered yet");
            return;
        }
        
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!ctx) {
            console.error("Canvas context not supported");
            return;
        }
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "QRCode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    const merchantId = String(user.id);

    return (


        <div className="flex flex-col items-center justify-center">
            <QRCode 
                value={merchantId} 
                size={128} 
                style={{ margin: '20px' }}
                ref={qrCodeRef}
            />
            <button className="bg-[#6a51a6] p-2 rounded-sm text-white font-semibold" onClick={downloadQRCode}>Download QR Code</button>
        </div>
    )
}
