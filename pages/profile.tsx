import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { withLayout } from '../layout/layout';
import { getUserById } from '../util/staticPropsApi';
import { IUser } from '../global/interfaces/user';
import { UserProfile } from 'components';
import { Card } from '@components/ui';

interface ProfileProps {
  user: IUser;
}

const Profile: NextPage<ProfileProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>{user.username}</title>
      </Head>

      <div className="container">
        <Card>
          <UserProfile user={user} />
        </Card>
      </div>
    </>
  );
};

export default withLayout(Profile);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  const user = await getUserById(session.user?.id as string);

  return {
    props: {
      user,
    },
  };
};
