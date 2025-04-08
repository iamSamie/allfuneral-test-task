// import { Button } from '@/modules/shared/ui';
// import { SvgIcon } from '@/modules/shared/components';
//
// import { Card } from '../card/card.component.tsx';
// import { Photo } from '../photo/photo.component.tsx';
// import type { Photo as PhotoType } from '../../types.ts';
// import { useCompanyStore } from '../../store/use-company-store.ts';
//
// import styles from '../../layout.module.sass';
//
//
// interface PhotoCardProps {
//   photos: PhotoType[];
// }
//
// export const PhotoCard = ({ photos }: PhotoCardProps) => {
//   const store = useCompanyStore();
//
//   const handleDelete = async (photo: PhotoType) => {
//     await store.deleteImage('12',photo.name);
//   }
//
//   return (
//     <Card
//       title="Photos"
//       ActionButton={
//         <Button
//           appearance="outline"
//           icon={<SvgIcon name="photo" />}
//           className={styles.layout__cards_wrapper__action_button}
//         >
//           Add
//         </Button>
//       }
//     >
//       <div className={styles.layout__images_wrapper}>
//         {photos.map((photo, index) => (
//           <Photo
//             key={index}
//             name={photo.name}
//             thumbpath={photo.thumbpath}
//             onDelete={() => handleDelete(photo)}
//           />
//         ))}
//       </div>
//     </Card>
//   );
// };
import { ChangeEvent, useRef } from 'react';
import { Button } from '@/modules/shared/ui';
import { SvgIcon } from '@/modules/shared/components';

import { Card } from '../card/card.component.tsx';
import { Photo } from '../photo/photo.component.tsx';
import type { Photo as PhotoType } from '../../types.ts';
import { useCompanyStore } from '../../store/use-company-store.ts';

import styles from '../../layout.module.sass';


interface PhotoCardProps {
  photos: PhotoType[];
}

export const PhotoCard = ({ photos }: PhotoCardProps) => {
  const store = useCompanyStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = async (photo: PhotoType) => {
    await store.deleteImage('12', photo.name);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await store.uploadImage('12', file);
    } catch (err) {
      console.error(err);
    } finally {
      e.target.value = '';
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card
      title="Photos"
      ActionButton={
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            appearance="outline"
            icon={<SvgIcon name="photo" />}
            className={styles.layout__cards_wrapper__action_button}
            onClick={triggerFileSelect}
          >
            Add
          </Button>
        </>
      }
    >
      <div className={styles.layout__images_wrapper}>
        {photos.map((photo, index) => (
          <Photo
            key={index}
            name={photo.name}
            thumbpath={photo.thumbpath}
            onDelete={() => handleDelete(photo)}
          />
        ))}
      </div>
    </Card>
  );
};
