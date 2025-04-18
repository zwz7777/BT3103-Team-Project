import { collection, addDoc, updateDoc, query, where, getDocs, doc, arrayUnion } from 'firebase/firestore';
import { db } from '@/firebase.js';
import { getAuth } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';

export const sendNotification = async (item, selectedItem) => {
  try {
    const postId = selectedItem.id;
    const posterUid = selectedItem.userId;
    const postDescription = selectedItem.description;
    const auth = getAuth();
    const requesterUid = auth.currentUser?.uid;

    if (!requesterUid) {
      alert('You must be logged in to send notifications.');
      return;
    }

    const storageKey = `notif_attempts_${requesterUid}_${postId}`;
    const now = Date.now();
    const storedAttempts = JSON.parse(localStorage.getItem(storageKey)) || [];

    console.log(`[Rate Limit] Storage key: ${storageKey}`);
    console.log(`[Rate Limit] All stored attempts:`, storedAttempts.map(ts => new Date(ts).toLocaleString()));
    const validAttempts = storedAttempts.filter(timestamp => now - timestamp < 600000);

    console.log(`[Rate Limit] Valid attempts in last 10 minutes:`, validAttempts.map(ts => new Date(ts).toLocaleString()));
    if (validAttempts.length >= 3) {
      const earliestAttemptTime = validAttempts[0];
      const now = new Date();
      const timePassed = (now - earliestAttemptTime) / 1000; // seconds
      const timeRemaining = 600 - timePassed; // 10 mins = 600s

      let notificationCooldown = Math.ceil(timeRemaining);

      // Start countdown if not already running
      if (!notificationCooldown) {
        setInterval(() => {
          if (notificationCooldown > 0) {
            notificationCooldown--;
          }
        }, 60000); // every minute
      }

      const mins = Math.ceil(notificationCooldown / 60);
      alert(`You have hit the notification limit. Try again in ${mins} minute(s).`);
      console.log(`[Rate Limit] Blocked. Try again in ${mins} minute(s).`);
      return;
    }

    validAttempts.push(now);
    localStorage.setItem(storageKey, JSON.stringify(validAttempts));

    const usersRef = collection(db, 'User');
    const q = query(usersRef, where('uid', '==', requesterUid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('Requester not found');
      return;
    }

    const requesterDoc = querySnapshot.docs[0];
    const requesterData = requesterDoc.data();

    const message = `${requesterData.nickname || 'Someone'} is interested in your lost item: "${postDescription}".\nTelegram: ${requesterData.telegram || 'N/A'}`;

    const notifRef = await addDoc(collection(db, 'notifications'), {
      posterUid,
      requesterUid,
      message,
      timestamp: serverTimestamp(),
    });

    const posterQuery = query(usersRef, where('uid', '==', posterUid));
    const posterSnapshot = await getDocs(posterQuery);

    if (posterSnapshot.empty) {
      console.error('Poster not found');
      return;
    }

    const posterDocId = posterSnapshot.docs[0].id;
    const posterRef = doc(db, 'User', posterDocId);

    await updateDoc(posterRef, {
      notifications: arrayUnion(notifRef.id)
    });

    alert('Notification sent to the post owner!');
  } catch (error) {
    console.error('Error sending notification:', error.message, error.stack);
    alert('Failed to send notification.');
  }
};
