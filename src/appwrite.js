import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

console.log("PROJECT_ID", PROJECT_ID);
console.log("DATABASE_ID", DATABASE_ID);
console.log("COLLECTION_ID", COLLECTION_ID);
console.log("ENDPOINT", ENDPOINT);

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, book) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm)
    ]);
    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        book_id: book.id,
        poster_url: book.formats['image/jpeg']
      });
    }
  } catch (error) {
    console.error("Appwrite error:", error);
  }
};
 
export const getTrendingBooks = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(3),
      Query.orderDesc("count")
    ])
    return result.documents;
  } catch (error) {
    console.error(error)
  }
}