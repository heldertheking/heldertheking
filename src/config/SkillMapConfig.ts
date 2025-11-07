export interface SkillNode {
    id: string;
    label: string;
    category?: string;
    color?: string;
}

export interface SkillConnection {
    from: string;
    to: string;
}

export interface SkillMapConfig {
    nodes: SkillNode[];
    connections: SkillConnection[];
}

const skillMapConfig: SkillMapConfig = {
    nodes: [
        { id: 'java', label: 'Java', category: 'Language', color: '#f89820' },
        { id: 'springboot', label: 'Spring Boot', category: 'Framework', color: '#6db33f' },
        { id: 'restapi', label: 'REST API', category: 'Architecture', color: '#61dafb' },
        { id: 'grpc', label: 'gRPC', category: 'Architecture', color: '#4285f4' },
        { id: 'json', label: 'JSON', category: 'Format', color: '#292929' },
        { id: 'protobuf', label: 'Protobuf', category: 'Format', color: '#4285f4' },
        { id: 'typescript', label: 'TypeScript', category: 'Language', color: '#3178c6' },
        { id: 'react', label: 'React', category: 'Framework', color: '#61dafb' },
        { id: 'node', label: 'Node.js', category: 'Runtime', color: '#339933' },
        { id: 'postgres', label: 'PostgreSQL', category: 'Database', color: '#336791' },
        { id: 'docker', label: 'Docker', category: 'DevOps', color: '#2496ed' },
        { id: 'kubernetes', label: 'Kubernetes', category: 'DevOps', color: '#326ce5' },
    ],
    connections: [
        { from: 'java', to: 'springboot' },
        { from: 'springboot', to: 'restapi' },
        { from: 'springboot', to: 'grpc' },
        { from: 'restapi', to: 'json' },
        { from: 'grpc', to: 'protobuf' },
        { from: 'typescript', to: 'react' },
        { from: 'typescript', to: 'node' },
        { from: 'react', to: 'restapi' },
        { from: 'node', to: 'restapi' },
        { from: 'springboot', to: 'postgres' },
        { from: 'node', to: 'postgres' },
        { from: 'springboot', to: 'docker' },
        { from: 'docker', to: 'kubernetes' },
    ],
};

export default skillMapConfig;