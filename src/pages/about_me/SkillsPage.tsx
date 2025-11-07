import React, {useEffect, useRef, useState} from "react";
import SkillMapCanvas from "../../components/SkillMap.tsx";
import {useSkillMapConfig} from "../../hooks";

const SkillsPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    const { config, nodePositions, isLoading } = useSkillMapConfig();

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            setOffset({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        } else {
            if (!config || !nodePositions) return;

            const rect = canvasContainerRef.current?.getBoundingClientRect();
            if (!rect) return;

            const mouseX = (e.clientX - rect.left - dimensions.width / 2 - offset.x) / zoom;
            const mouseY = (e.clientY - rect.top - dimensions.height / 2 - offset.y) / zoom;

            let foundNode: string | null = null;

            for (const node of config.nodes) {
                const pos = nodePositions.get(node.id);
                if (!pos) continue;

                const distance = Math.sqrt(
                    Math.pow(mouseX - pos.x, 2) + Math.pow(mouseY - pos.y, 2)
                );

                if (distance < 40) {
                    foundNode = node.id;
                    break;
                }
            }

            setHoveredNode(foundNode);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setZoom(prev => {
            const newZoom = prev * delta;
            return Math.min(Math.max(Math.round(newZoom * 100) / 100, 0.5), 3);
        });
    };

    // Add controls and footer
    const handleZoomIn = () => setZoom(z => Math.min(Math.round((z * 1.1) * 100) / 100, 3));
    const handleZoomOut = () => setZoom(z => Math.max(Math.round((z * 0.9) * 100) / 100, 0.5));
    const handleReset = () => {
        setOffset({ x: 0, y: 0 });
        setZoom(1);
    };

    return (
        <div className="absolute top-0 left-0 w-screen h-screen z-40 bg-white">
            <div
                ref={containerRef}
                className="w-full h-full relative overflow-hidden"
                style={{ cursor: isDragging ? 'grabbing' : hoveredNode ? 'pointer' : 'grab' }}
            >
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                            <p className="text-gray-600 text-lg">Loading...</p>
                        </div>
                    </div>
                ) : (
                    config && nodePositions && (
                        <>
                        <div
                            ref={canvasContainerRef}
                            className="absolute top-0 left-0 w-full h-full"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onWheel={handleWheel}
                        >
                            <SkillMapCanvas
                                config={config}
                                nodePositions={nodePositions}
                                offset={offset}
                                zoom={zoom}
                                hoveredNode={hoveredNode}
                                dimensions={dimensions}
                            />
                        </div>

                        <div className="absolute bottom-4 right-4 z-50 flex gap-2 bg-white bg-opacity-80 rounded-lg shadow-lg p-3 border border-gray-200 backdrop-blur-sm">
                            <button className="px-3 py-1 rounded bg-gray-600 text-white font-bold text-lg shadow hover:bg-gray-700 transition" onClick={handleZoomOut} title="Zoom Out">-</button>
                            <button className="px-3 py-1 rounded bg-gray-700 text-white font-semibold text-base shadow hover:bg-gray-800 transition" onClick={handleReset} title="Reset View">{ (zoom * 100).toFixed(0) }%</button>
                            <button className="px-3 py-1 rounded bg-gray-600 text-white font-bold text-lg shadow hover:bg-gray-700 transition" onClick={handleZoomIn} title="Zoom In">+</button>
                        </div>

                        <footer className="absolute bottom-0 left-0 w-full text-center text-xs text-stone-800 py-2 bg-transparent z-50">
                            &copy; 2025 Hélder Oliveira. Skill Map Visualization.
                        </footer>
                        </>
                    )
                )}
            </div>
        </div>
    );
};

export default SkillsPage;