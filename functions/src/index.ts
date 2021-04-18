import * as functions from 'firebase-functions';

exports.moderator = functions.database
  .ref('/books/{bookId}')
  .onWrite((change) => {
    const data = change.after.val();

    if (data && !data.description) {
      const moderatedDescription = 'Скоро здесь будет описание…';
      return change.after.ref.update({
        description: moderatedDescription,
      });
    }
    return null;
  });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
