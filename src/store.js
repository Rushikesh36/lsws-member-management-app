import { createStore } from 'vuex';
import { getProfile, updateProfile, addProfile, deleteProfile, addDocument, getDocument, getReceipt, getResult, getOneReceiptFromFirebase, getAllInfo, deleteDocument, getBirthdays, changeFamilyHead } from './index';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import router from './router';
const auth = getAuth();

const store = createStore({
  state: {
    forgetPasswordError: '',
    password: '',
    uid: 'defaultValue',
    memberDetails: [],
    headDetails: [],
    allMembers: [],
    user: '',
    signUpError: '',
    signInError: '',
    isAuthenticated: false,
    docs: '',
    result: '',
    receipt: '',
    templateReceipt: {
      vargani: 0,
      others: 0,
      total: 0,
      shulk: 0,
      purskrut_rakkam: 0,
      navvivahit: 0,
      smarnarth_dengi: 0,
      bhojan: 0,
      dengi: 0,
      vishesh_bakshish: 0,
      url: '',
      type: 'receipt',
      date: '',
    },
    info: '',
    birthdays: '',
  },
  actions: {
    async changeHead({state}, obj){
      await changeFamilyHead(obj.prof1,obj.prof2,state.user);
    },
    getAccountProfileDetails: async ({ state, dispatch}) => {
      const profiles = await getProfile(state.user);
      const index = profiles.findIndex(obj => obj.head === true);
      state.allMembers = profiles;
      state.headDetails = profiles[index];
      console.log(index);
      const head = profiles[index];
      console.log(head.uid);
      if(head.uid == undefined){
        let obj = {
          ...head,
          uid: state.uid,
        }
        dispatch('setAccountProfileDetails',obj);
      }
      let memberDetails = [...profiles.slice(0, index), ...profiles.slice(index + 1)];
      const newArray = memberDetails.map(obj => {
        return {
          ...obj,
          title: obj.name,
          value: obj.id,
        };
      });
      state.memberDetails = newArray;
    },
    setAccountProfileDetails: async ({ state }, obj) => {
      await updateProfile(obj, state.user);
    },
    createProfile: async ({ state }, obj) => {
      await addProfile(obj, state.user);
    },
    deleteMemberProfile: async ({ state, dispatch }, obj) => {
      await deleteProfile(obj, state.user).then((res) => {
        console.log(res);
        dispatch('getAccountProfileDetails');
      })
    },
    uploadDocument: async ({ state }, obj) => {
      console.log(state);
      await addDocument(obj);
    },
    changePassword: async ({ state, dispatch }, val) => {
      console.log('changepwd',state,val);
      await updatePassword(auth.currentUser, val)
        .then(() => {
          // Update successful.
          const payload = {
            email: state.user,
            password: val
          }
          dispatch('signUserIn',payload)
        }).catch(() => {
          // An error ocurred
          // ...
        });
    },
    passwordReset: async ({ state }, email) => {
      console.log(state);
      sendPasswordResetEmail(auth, email).then(() => {
        state.forgetPasswordError = `Sucessfully sent a password reset link to ${email}`;
      }).catch((error) => {
        console.log(error);
        state.forgetPasswordError = error;
      });
    },
    signUserUp({ state }, payload) {
      state.signUpError = '';
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then(
          user => {
            state.user = user.user.email;
            state.signUpError = 'noError';
            signOut(auth)
          }
        )
        .catch(
          error => {
            state.signUpError = error.message;
          }
        )
    },
    checkLoggedIn({ state, dispatch}) {
      console.log('Checking',auth.user);
      const user = auth.currentUser;
      console.log('Checking',user);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user.uid);
          state.user = user.email;
          state.uid = user.uid;
          if (state.user) {
            state.isAuthenticated = true;
          }
          dispatch('getAccountProfileDetails');
          router.push('/');
        }else{
          state.uid = 'notLoggedIn';
        }
      });
    },
    signUserIn({ state, dispatch }, payload) {
      state.password = payload.password;
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then(
          user => {
            state.signInError = '';
            state.user = user.user.email;
            state.uid = user.user.uid;
            if (state.user) {
              state.isAuthenticated = true;
            }
            console.log(state.isAuthenticated);
            dispatch('getAccountProfileDetails');
            router.push('/');
          }
        )
        .catch(
          error => {
            state.signInError = error.message;
            console.log(error)
          }
        )
    },
    logout({ state }) {
      signOut(auth)
        .then(() => {
          router.push('/login');
          state.isAuthenticated = false;
          state.user = null;
        })
    },
    async getAllDocuments({ state }, year) {
      let docs = await getDocument(state.uid, year);
      state.docs = docs;
    },
    async getAllReceipt({ state }, year) {
      let docs = await getReceipt(state.uid, year);
      console.log(docs);
      state.receipt = docs;
    },
    async getAllResult({ state }, year) {
      let docs = await getResult(state.uid, year);
      state.result = docs;
    },
    async getOneReceipt({ state }, id) {
      state.templateReceipt = await getOneReceiptFromFirebase(id);
    },
    async getInfo({ state }) {
      let data = await getAllInfo();
      const newArray = data.map(obj => {
        return {
          ...obj,
          title: obj.name,
          value: obj.id,
        };
      });
      state.info = newArray;
    },
    async deleteDoc({ state }, id) {
      console.log(state);
      await deleteDocument(id);
    },
    async getAllBirthdays({ state }) {
      console.log(state);
      state.birthdays = await getBirthdays();
      console.log(state);
    }
  },
  getters: {
    getHeadDetails: (state) => state.headDetails,
    getMemberDetails: (state) => state.memberDetails,
    getAllMembers: (state) => state.allMembers,
    getUserDetails: (state) => state.user,
    getAllDocs: (state) => state.docs,
    getAllResult: (state) => state.result,
    getAllReceipt: (state) => state.receipt,
    getTemplateReceipt: (state) => state.templateReceipt,
  }
});

export default store;