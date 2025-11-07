import skillMapConfig, {type SkillMapConfig} from "../config/SkillMapConfig.ts";
import {useEffect, useState} from "react";

function useSkillMapConfig() {
    const [config, setConfig] = useState<SkillMapConfig | null>(null);
    const [nodePositions, setNodePositions] = useState<Map<string, { x: number; y: number }> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // TODO: Replace with actual data fetching logic later
    useEffect(() => {
        const loadConfig = async () => {
            setIsLoading(true);
            setConfig(skillMapConfig);
            setNodePositions(generateNodePositions(skillMapConfig));
            setIsLoading(false);
        };

        loadConfig();
    }, []);

    return { config, nodePositions, isLoading };
}

function generateNodePositions(config: SkillMapConfig) {
    const positions = new Map<string, { x: number; y: number }>();
    const layers = new Map<string, number>();
    const visited = new Set<string>();

    const hasIncoming = new Set(config.connections.map(c => c.to));
    const roots = config.nodes.filter(n => !hasIncoming.has(n.id));

    const queue = roots.map(r => ({ id: r.id, layer: 0 }));

    while (queue.length > 0) {
        const current = queue.shift()!;
        if (visited.has(current.id)) continue;

        visited.add(current.id);
        layers.set(current.id, current.layer);

        const children = config.connections
            .filter(c => c.from === current.id)
            .map(c => c.to);

        children.forEach(childId => {
            if (!visited.has(childId)) {
                queue.push({ id: childId, layer: current.layer + 1 });
            }
        });
    }

    const layerGroups = new Map<number, string[]>();
    layers.forEach((layer, id) => {
        if (!layerGroups.has(layer)) layerGroups.set(layer, []);
        layerGroups.get(layer)!.push(id);
    });

    const layerSpacing = 250;
    const nodeSpacing = 150;

    layerGroups.forEach((nodeIds, layer) => {
        const totalHeight = (nodeIds.length - 1) * nodeSpacing;
        nodeIds.forEach((id, index) => {
            positions.set(id, {
                x: layer * layerSpacing,
                y: index * nodeSpacing - totalHeight / 2,
            });
        });
    });

    return positions;
}

export { useSkillMapConfig };