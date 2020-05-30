import { BaseDocument } from './BaseModel';

/**
 * This contains the meta-data about a topic.
 * we can use this for many use cases.
 *  */
export interface TopicProperties {
    color?: string;
    size?: string;
    isTechnical?: boolean;
    rating?: number;
}

/**
 * this will be the actual heading used as a big bold word.
 * default heading is h3
 */
interface Heading {
    type?: 'h1' | 'h2' | 'h3' | 'h4';
    value: string;
}

/**
 * V.Imp part it is ! Will contain almost everything.
 * The plan was to keep the content as string which may contain some basic html
 * Example: I am a paragraph. I have <code>Heading</code> and <code> Footer </code> as well.
 * But it din't fit well in my angular application. I am keeping it as an object.
 * Default type is 'text
 * 
 */
export interface ContentObj {
    type?: 'text' | 'code' | 'bold' | 'link'; //this code is not code card , this is just a highlighted text inside a paragraph.
    value: string;
    noteType?: 'warning' | 'success' | 'danger';
    codeType?: 'html' | 'css' | 'ts' | 'js' | 'sass';
    heading?: string;//applicable for note and code card content
}

/**
 * default type is 'p'.
 * code type => code card.
 * note type => note card
 * image : image card
 * 
 */
interface ContentMap {
    type?: 'p' | 'h4' | 'h5' | 'code' | 'note' | 'image',
    content: ContentObj[];

}
/**
 * Each Content will have a big bold heading and all the details (paragraph, code ,notes, etc..) under it.
 */
export interface Content {
    heading: Heading;
    contentMapList: ContentMap[];
}
/**
 * description : short detail about the topic to display on card
 * intro : The first part on topic-detail which tells about the topic.
 */
export interface TopicDocument extends BaseDocument {
    id: string;
    name: string;
    description: string; // short detail on the topic card in topic-list page
    intro: ContentObj[];
    icon: string; // icon to be used in the topic card
    properties: TopicProperties;
    contentList: Content[],
    rating: number;
};