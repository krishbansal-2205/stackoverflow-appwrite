import { Permission } from 'node-appwrite';
import { databases } from './config';
import { answerCollection, db } from '../name';

export default async function createAnswerCollection() {
   await databases.createCollection(db, answerCollection, answerCollection, [
      Permission.read('any'),
      Permission.read('users'),
      Permission.update('users'),
      Permission.delete('users'),
      Permission.create('users'),
   ]);
   console.log('answer collection created');

   await Promise.all([
      databases.createStringAttribute(
         db,
         answerCollection,
         'content',
         10000,
         true
      ),
      databases.createStringAttribute(
         db,
         answerCollection,
         'questionId',
         50,
         true
      ),
      databases.createStringAttribute(
         db,
         answerCollection,
         'authorId',
         50,
         true
      ),
   ]);
   console.log('answer attributes created');
}
