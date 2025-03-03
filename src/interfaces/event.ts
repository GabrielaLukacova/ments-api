import { User } from './user';

export interface Event extends Document {
    name: string;
    date: Date;
    time: string;
    place: string;
    eventType: EventType;
    imageURL: string;
    description: string;
    _createdBy: User['id'];
}

export enum EventType {
    ACTIVE = "Active",
    CREATIVE = "Creative",
    SOCIAL = "Social",
    SPECIAL = "Special",
    SPORT = "Sport"
}