export enum TypeName {
    Site = 'globe',
    Zone = 'box',
    Layer = 'th-large',
    Placemark = 'map-marker',
    Sensor = 'cog',
}

export interface Entity {
    id: string;
    name?: string;
    type: { name: string };
    parentId?: string;
    data: Entity;
    icon: string;
    camera?: { name: string, connection?: boolean };
    connection?: boolean;
    children: Entity[]
}