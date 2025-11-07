import type {SkillMapConfig} from "../config/SkillMapConfig.ts";
import React, {useEffect, useRef} from "react";

interface SkillMapCanvasProps {
    config: SkillMapConfig;
    nodePositions: Map<string, { x: number; y: number }>;
    offset: { x: number; y: number };
    zoom: number;
    hoveredNode: string | null;
    dimensions: { width: number; height: number };
}

const SkillMapCanvas: React.FC<SkillMapCanvasProps> = ({
    config,
    nodePositions,
    offset,
    zoom,
    hoveredNode,
    dimensions,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        drawCanvas(ctx, dimensions.width, dimensions.height);
    }, [offset, zoom, hoveredNode, config, nodePositions, dimensions]);

    const drawCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.clearRect(0, 0, width, height);

        // Draw grid background
        drawGrid(ctx, width, height);

        ctx.save();
        ctx.translate(width / 2 + offset.x, height / 2 + offset.y);
        ctx.scale(zoom, zoom);

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;

        config.connections.forEach(conn => {
            const fromPos = nodePositions.get(conn.from);
            const toPos = nodePositions.get(conn.to);

            if (fromPos && toPos) {
                ctx.beginPath();
                ctx.moveTo(fromPos.x, fromPos.y);
                ctx.lineTo(toPos.x, toPos.y);
                ctx.stroke();

                const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
                const arrowSize = 10;
                const arrowX = toPos.x - Math.cos(angle) * 50;
                const arrowY = toPos.y - Math.sin(angle) * 50;

                ctx.beginPath();
                ctx.moveTo(arrowX, arrowY);
                ctx.lineTo(
                    arrowX - arrowSize * Math.cos(angle - Math.PI / 6),
                    arrowY - arrowSize * Math.sin(angle - Math.PI / 6)
                );
                ctx.moveTo(arrowX, arrowY);
                ctx.lineTo(
                    arrowX - arrowSize * Math.cos(angle + Math.PI / 6),
                    arrowY - arrowSize * Math.sin(angle + Math.PI / 6)
                );
                ctx.stroke();
            }
        });

        // Draw nodes and labels directly on canvas
        config.nodes.forEach(node => {
            const pos = nodePositions.get(node.id);
            if (!pos) return;
            const isHovered = hoveredNode === node.id;
            const radius = 40;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = node.color || '#3b82f6';
            ctx.fill();
            if (isHovered) {
                ctx.strokeStyle = '#1e40af';
                ctx.lineWidth = 3;
                ctx.stroke();
            } else {
                ctx.strokeStyle = '#64748b';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const words = node.label.split(' ');
            if (words.length > 1) {
                ctx.fillText(words[0], pos.x, pos.y - 7);
                ctx.fillText(words.slice(1).join(' '), pos.x, pos.y + 7);
            } else {
                ctx.fillText(node.label, pos.x, pos.y);
            }
            if (node.category) {
                ctx.fillStyle = isHovered ? '#1e293b' : '#64748b';
                ctx.font = '11px system-ui, -apple-system, sans-serif';
                ctx.fillText(node.category, pos.x, pos.y + radius + 20);
            }
        });

        ctx.restore();
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const gridSize = 50 * zoom;
        const offsetX = (width / 2 + offset.x) % gridSize;
        const offsetY = (height / 2 + offset.y) % gridSize;

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = offsetX; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = offsetY; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw thicker lines for major grid
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;

        const majorGridSize = gridSize * 4;
        const majorOffsetX = (width / 2 + offset.x) % majorGridSize;
        const majorOffsetY = (height / 2 + offset.y) % majorGridSize;

        for (let x = majorOffsetX; x < width; x += majorGridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = majorOffsetY; y < height; y += majorGridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    };

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default SkillMapCanvas;
