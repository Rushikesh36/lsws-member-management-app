import { createRouter , createWebHistory } from 'vue-router';
import store from './store';
import ProfilePage from '../src/components/ProfilePage';
import DocumentListingPage from '../src/components/DocumentListingPage';
import DocumentUploadPage from '../src/components/DocumentUploadPage';
import ResultUploadPage from '../src/components/Forms/ResultUpload';
import ReceiptUploadPage from '../src/components/Forms/ReceiptUpload';
import EditPage from '../src/components/EditMember';
import AddMember from '../src/components/CreateProfile';
import GeneralDocumentUpload from '../src/components/Forms/DocumentUpload';
import LoginPage from '../src/components/LoginForm';
import ReceiptTemplate from '../src/components/ReceiptTemplate';
import LandingPage from '../src/components/LandingPage';
import ViewDocument from '../src/components/ViewDocument';
import ForgetPassword from '../src/components/ForgetPassword';
import LoadingPage from '../src/components/LoadingPage';
import ChangeHead from '../src/components/ChangeHead';
import profileSettings from '../src/components/ProfileSettings';
import paymentDetails from '../src/components/PaymentDetails';
import MembersList from '../src/components/MembersList';
import NoticeComponent from '../src/components/NoticeComponent';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: LandingPage},
        { path: '/profile' , name: 'profile', component : ProfilePage},
        { path: '/notices', name: 'notice', component: NoticeComponent},
        { path: '/changePassword', name: 'profile-forget', component: ForgetPassword},
        { path: '/documents', name: 'document', component : DocumentListingPage},
        { path: '/upload', name: 'document-upload', component : DocumentUploadPage},
        { path: '/upload/result', name: 'document-result', component : ResultUploadPage},
        { path: '/upload/receipt', name: 'document-receipt-page', component : ReceiptUploadPage},
        { path: '/edit', name: 'profile-edit', component : EditPage},
        { path: '/addMember', name: 'profile-add', component : AddMember},
        { path: '/upload/document', name: 'document-upload-doc', component : GeneralDocumentUpload},
        { path: '/login', name:'login', component : LoginPage},
        { path: '/receipt', name: 'document-receipt', component : ReceiptTemplate},
        { path: '/viewDocument', name: 'view-document', component : ViewDocument},
        { path: '/loadingpage', name: 'loading', component: LoadingPage},
        { path: '/changehead', name: 'profile-changehead', component : ChangeHead},
        { path: '/settings', name: 'profile-settings', component : profileSettings},
        { path: '/paymentDetails', name: 'payment-details', component : paymentDetails},
        { path: '/membersList', name: 'members-list', component : MembersList},
    ],
    scrollBehavior(to) {
        document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    }
});

router.beforeEach(async (to, from, next) => {
    // You can perform actions here before navigating to a route
    console.log(store.state.user);
    console.log(store.state.isAuthenticated);

    if(to.name==='login' && store.state.isAuthenticated){
        next('/');
    }
    else if(to.name!=='login' && !store.state.isAuthenticated){
        next('/login')
    }else{
        console.log('her')
        next()
    }
});

export default router;
