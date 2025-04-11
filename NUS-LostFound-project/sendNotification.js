import { getFirestore, doc, getDoc, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

/**
 * Sends contact info from userA (currentUserId) to userB (postOwnerId)
 * @param {string} currentUserId - The user clicking the button (User A)
 * @param {string} postOwnerId - The user who posted the item (User B)
 * @param {string} postDescription - Description from the post (for context)
 */
export async function sendNotification(currentUserId, postOwnerId, postDescription) {
  try {
    // Fetch User A's contact info
    const userADocRef = doc(db, "users", currentUserId);
    const userASnapshot = await getDoc(userADocRef);

    if (!userASnapshot.exists()) {
      throw new Error("User A's contact info not found.");
    }

    const userAData = userASnapshot.data();

    // Construct the message
    const message = `User "${userAData.nickname}" has responded to your post: "${postDescription}".\n` +
                    `Contact Info:\n` +
                    `Email: ${userAData.email}\n` +
                    `Phone: ${userAData.phoneNumber}\n` +
                    `Telegram: ${userAData.telegram}`;

    // Send notification to User B
    const notificationsRef = collection(db, "notifications", postOwnerId, "messages");
    await addDoc(notificationsRef, {
      message,
      from: currentUserId,
      timestamp: new Date(),
      seen: false
    });

    console.log("Notification sent successfully.");
  } catch (error) {
    console.error("Error sending contact notification:", error);
  }
}
