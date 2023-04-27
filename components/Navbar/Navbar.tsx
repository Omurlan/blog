import Link from 'next/link';
import styles from './Navbar.module.css';
import cn from 'classnames';

import { BsPencil } from 'react-icons/bs';
import { signOut, useSession } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { status, data: session } = useSession();

  const logout = () => signOut();

  return (
    <div className={styles.navbar}>
      <ul className={styles.list}>
        <li>
          <Link href="/blogs" className={styles.write}>
            Блоги
          </Link>
        </li>
        <li>
          <Link href="/blogs/create" className={styles.write}>
            <BsPencil />
            Написать блог
          </Link>
        </li>

        {!session && status === 'unauthenticated' && <Link href="/auth/signin">Войти</Link>}

        {session && status === 'authenticated' && (
          <Link href="/profile" className={styles.profile}>
            <img className={styles.avatar} src={session.user.avatar!} alt="Профиль" />
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
