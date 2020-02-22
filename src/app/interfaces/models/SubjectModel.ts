import { BaseDocument } from './BaseModel';

export interface SubjectProperties {
    color: string;
    size?: string;
    isTechnical?: boolean;
    rating: number;

}
export interface SubjectDocument extends BaseDocument {
    id: string;
    name: string;
    description: string;
    tracks: string[];
    properties: SubjectProperties;
};
////////////////////// Sample Data- Just for reference  /////////////
const sample: SubjectDocument = {
    "name": "Ionic Tooling",
    "description": "Mobile devices and browsers are now advanced enough that developers can build native-quality mobile apps using open web technologies like HTML5, Javascript, and CSS.",
    "tracks": ["Tooling"],
    "id": "3",
    "properties": {
        "color": "green",
        "rating": 9,
        "size": "Medium",
        "isTechnical": true
    }
}

/**
 * Dot notation allows you to update a single nested field without overwriting other nested field.
 * If you update a nested field without dot notation, you will overwrite the entire map field
 */
const updatePropertiesSample = {
    "description": "Mobile devices and browsers are now advanced enough",
    "properties.color": "blue"
}