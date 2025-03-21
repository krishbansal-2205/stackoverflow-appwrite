import { Permission } from 'node-appwrite';
import { databases } from './config';
import { commentCollection, db } from '../name';

export default async function createCommentCollection() {
   await databases.createCollection(db, commentCollection, commentCollection, [
      Permission.read('any'),
      Permission.read('users'),
      Permission.update('users'),
      Permission.delete('users'),
      Permission.create('users'),
   ]);
   console.log('comment collection created');

   await Promise.all([
      databases.createStringAttribute(
         db,
         commentCollection,
         'content',
         10000,
         true
      ),
      databases.createEnumAttribute(
         db,
         commentCollection,
         'type',
         ['answer', 'question'],
         true
      ),
      databases.createStringAttribute(
         db,
         commentCollection,
         'typeId',
         50,
         true
      ),
      databases.createStringAttribute(
         db,
         commentCollection,
         'authorId',
         50,
         true
      ),
   ]);
   console.log('comment attributes created');
}
