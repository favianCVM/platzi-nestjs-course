import { ObjectId } from 'mongodb';

export interface PayloadToken {
	role: string;
	_id: ObjectId;
}
