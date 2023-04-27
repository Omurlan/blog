import { signOut } from 'next-auth/react';
import styles from './UserProfile.module.css';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { IUser } from '@interface/user';
import Avatar from './Avatar/Avatar';
import { MdWavingHand } from 'react-icons/md';
import { Button } from '@skbkontur/react-ui';

interface UserProfileProps {
  user: IUser;
}

const Profile: React.FC<UserProfileProps> = ({ user }) => {
  const logout = () => signOut();

  return (
    <div className={styles.profile}>
      <h1 className={styles.title}>Профиль</h1>

      <div>
        <p className={styles.welcome}>
          Привет, {user.username}
          <MdWavingHand className={styles.icon} />
        </p>

        <Avatar user={user} />

        <p>{user.email}</p>
        <span className={styles.created}>
          Дата регистрации: {dayjs(user.createdAt).locale('ru').format('DD MMM YYYY')}
        </span>
      </div>

      <Button className={styles.logout} onClick={logout}>
        Выйти
      </Button>
    </div>
  );
};

export default Profile;
