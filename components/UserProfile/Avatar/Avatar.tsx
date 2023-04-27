import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './Avatar.module.css';
import { storage } from '@libs/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { IUser } from '@interface/user';
import Avatar from 'react-avatar';

interface UserAvatarProps {
  user: IUser;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const uploadImage = () => {
    if (imageUpload !== null) {
      const imageRef = ref(storage, `avatars/${imageUpload.name + v4()}`);

      // console.log(imageRef);

      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);

          fetch(`/api/user/${user._id}`, {
            method: 'PUT',
            body: JSON.stringify({ avatar: url, _id: user._id }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((data) => console.log(data));
        });
      });
    }
  };

  useEffect(() => {
    uploadImage();
  }, [imageUpload]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className={styles.upload}>
      {!user.avatar && !imageUrl && <Avatar className={styles.avatar} name={user.username} />}
      {(imageUrl || user.avatar) && (
        <img className={styles.avatar} src={imageUrl ? imageUrl : user.avatar} />
      )}

      <label className={styles.label}>
        Загрузить
        <input className={styles.uploadInput} type="file" onChange={handleChange} />
      </label>
    </div>
  );
};

export default UserAvatar;
