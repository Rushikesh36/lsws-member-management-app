import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyAqGzRGsNMI_LQPZKsJEz8SrH8gVMjj7Rg",
  authDomain: "wani-samaj.firebaseapp.com",
  projectId: "wani-samaj",
  storageBucket: "wani-samaj.appspot.com",
  messagingSenderId: "236432959431",
  appId: "1:236432959431:web:dbbe6674c7f310acabdbe2"
};


const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore()
const profileCollection = db.collection('Profiles')
const notifications = db.collection('Notifications');
const info = db.collection('Info');
const documentsCollection = db.collection('Docs');

export const getProfile = async (email) => {
  let profileDetails = [];
  const profile = await profileCollection.doc(email).collection('Members').orderBy('dob').get();

  profile.forEach(doc => {
    profileDetails.push({ ...doc.data(), id: doc.id });
  });
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Note: months are 0-based in JavaScript Date
  };
  
  // Sort the array of objects based on the 'date' field
  profileDetails.sort((a, b) => parseDate(a.dob) - parseDate(b.dob));
  return profileDetails;
}

export const updateProfile = async (obj,email) => {
  info.doc(obj.id).update(obj);
  profileCollection.doc(email).collection('Members').doc(obj.id).update(obj);
};

export const addProfile = async (obj,email) => {
  const docId = `${obj.name}${obj.dob}${obj.email}`;
  info.doc(docId).set(obj);
  profileCollection.doc(email).collection('Members').doc(docId).set(obj);
};

export const deleteProfile = async (obj,email) => {
  await info.doc(obj.id).delete(obj);
  const data = await profileCollection.doc(email).collection('Members').doc(obj.id).delete();
  return data;
};

export const addDocument = async (obj) => {
  console.log(obj);
  documentsCollection.add(obj);
} ;

export const getDocument = async (email,year) => {
  let documentDetails = [];
  console.log(year,email);
  const document = await documentsCollection.where('type','==','others').where('year','==',year).where('uid','==',email).orderBy('date').get();
  console.log(document);
  document.forEach(doc => {
    documentDetails.push({ ...doc.data(), id: doc.id });
  });
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Note: months are 0-based in JavaScript Date
  };
  
  // Sort the array of objects based on the 'date' field
  documentDetails.sort((a, b) => parseDate(a.date) - parseDate(b.date));
  return documentDetails;
}

export const getReceipt = async (email,year) => {
  let documentDetails = [];
  const document = await documentsCollection.where('type','==','receipt').where('year','==',year).where('uid','==',email).orderBy('date').get();
  document.forEach(doc => {
    documentDetails.push({ ...doc.data(), id: doc.id });
  });
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Note: months are 0-based in JavaScript Date
  };
  
  // Sort the array of objects based on the 'date' field
  documentDetails.sort((a, b) => parseDate(a.date) - parseDate(b.date));
  return documentDetails;
}

export const getResult = async (email,year) => {
  let documentDetails = [];
  const document = await documentsCollection.where('type','==','result').where('year','==',year).where('uid','==',email).orderBy('date').get();
  document.forEach(doc => {
    documentDetails.push({ ...doc.data(), id: doc.id });
  });
  console.log(document);
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Note: months are 0-based in JavaScript Date
  };
  
  // Sort the array of objects based on the 'date' field
  documentDetails.sort((a, b) => parseDate(a.date) - parseDate(b.date));
  return documentDetails;
}

export const getOneReceiptFromFirebase = async (id) => {
  const document = await documentsCollection.doc(id).get();
  return document.data();
}

export const getNotices = async () => {
  const notices = [];
  const document = await notifications.orderBy('date', 'desc').get();
  document.forEach(doc => {
    notices.push({ ...doc.data(), id: doc.id });
  });
  console.log('calys notice', notices);
  return notices;
}

export const getAllInfo = async () => {
  let profileDetails = [];
  const profile = await info.get();

  profile.forEach(doc => {
    profileDetails.push({ ...doc.data(), id: doc.id });
  });

  return profileDetails;
}

export const deleteDocument = async (id) => {
  documentsCollection.doc(id).delete();
};

export const getBirthdays = async () => {
  let profileDetails = [];
  const today = new Date();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  
  const date = dd + '-' + mm ;
  const profile = await info.where('dob', '>=', date).where('dob', '<=', date+ '\uf8ff').get();
  console.log(profile);
  profile.forEach(doc => {
    profileDetails.push({ ...doc.data(), id: doc.id });
  });
  console.log(profileDetails);

  return profileDetails;
}

export const changeFamilyHead = async (obj1,obj2,email) => {
  console.log(email);
  //change in info
  info.doc(obj1.id).update(obj1);
  info.doc(obj2.id).update(obj2);

  //change in family profile
  profileCollection.doc(email).collection('Members').doc(obj1.id).update(obj1);
  profileCollection.doc(email).collection('Members').doc(obj2.id).update(obj2);
}