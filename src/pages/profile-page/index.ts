import userInfo from '../../mocks/user-info';
import render from '../../utils/render';
import ProfilePage from './profile-page';

render('#app', new ProfilePage({ userInfo }));
