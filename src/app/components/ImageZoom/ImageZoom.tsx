'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface ImageZoomProps {
    src: string;
    zoom?: number;
    width?: string;
    height?: string;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, zoom = 2, width = '400px', height = 'auto' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
    const [isZoomVisible, setIsZoomVisible] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const bounds = containerRef.current?.getBoundingClientRect();
        if (!bounds) return;

        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const lensSize = 100;
        const maxX = bounds.width - lensSize;
        const maxY = bounds.height - lensSize;

        setLensPosition({
            x: Math.max(0, Math.min(x - lensSize / 2, maxX)),
            y: Math.max(0, Math.min(y - lensSize / 2, maxY)),
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomVisible(true)}
            onMouseLeave={() => setIsZoomVisible(false)}
            style={{
                position: 'relative',
                width,
                height,
                overflow: 'hidden',
                cursor: 'none',
            }}
        >
            {!isZoomVisible && <Image src={src} alt="Zoomable" width={400} height={400} style={{ width: '100%', height: 'auto', display: 'block' }} />
            }
            {isZoomVisible && (
                <div
                    style={{
                        position: 'absolute',
                        top: lensPosition.y,
                        left: lensPosition.x,
                        width: 300,
                        height: 300,
                        border: '2px solid #000',
                        backgroundImage: `url(${src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${zoom * 100}%`,
                        backgroundPosition: `-${lensPosition.x * zoom}px -${lensPosition.y * zoom}px`,
                        pointerEvents: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                ><span
                    style={{ fontSize: '30px', }}>+</span></div>
            )}
        </div>
    );
};

export default ImageZoom;
