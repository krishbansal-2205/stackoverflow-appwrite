import { db } from '../name';
import createQuestionCollection from './question.collection';
import createAnswerCollection from './answer.collection';
import createCommentCollection from './comment.collection';
import createVoteCollection from './vote.collection';
import getOrCreateStorage from './storageSetup';
import { databases } from './config';

export default async function getOrCreateDB() {
   try {
      await databases.get(db);
      console.log('DB Connected');
   } catch (error) {
      try {
         await databases.create(db, db);
         console.log('DB Created');
         await Promise.all([
            createQuestionCollection(),
            createAnswerCollection(),
            createCommentCollection(),
            createVoteCollection(),
         ]);
         console.log('Collections Created');
         console.log('DB Connected');
      } catch (error) {
         console.log('Error creating DB:', error);
      }
   }
   return databases;
}
