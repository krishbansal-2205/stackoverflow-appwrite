import { IndexType, Permission } from 'node-appwrite';
import { databases } from './config';
import { db, questionCollection } from '../name';

export default async function createQuestionCollection() {
   await databases.createCollection(
      db,
      questionCollection,
      questionCollection,
      [
         Permission.read('any'),
         Permission.read('users'),
         Permission.update('users'),
         Permission.delete('users'),
         Permission.create('users'),
      ]
   );
   console.log('question collection created');

   await Promise.all([
      databases.createStringAttribute(
         db,
         questionCollection,
         'title',
         100,
         true
      ),
      databases.createStringAttribute(
         db,
         questionCollection,
         'content',
         10000,
         true
      ),
      databases.createStringAttribute(
         db,
         questionCollection,
         'authorId',
         50,
         true
      ),
      databases.createStringAttribute(
         db,
         questionCollection,
         'tags',
         50,
         true,
         undefined,
         true
      ),
      databases.createStringAttribute(
         db,
         questionCollection,
         'attachmentId',
         50,
         false
      ),
   ]);
   console.log('question attributes created');

   await Promise.all([
      databases.createIndex(
         db,
         questionCollection,
         'title',
         IndexType.Fulltext,
         ['title'],
         ['asc']
      ),
      databases.createIndex(
         db,
         questionCollection,
         'content',
         IndexType.Fulltext,
         ['content'],
         ['asc']
      ),
   ]);
   console.log('question indexes created');
}
