/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useRef, useState } from 'react';

import { CropImageProps } from './crop-image-types';

import styles from './crop-image.module.scss';

export const CropImage = ({ file, selectionType = 'circle', onSave, className, ...props }: CropImageProps) => {
  const [imageSrc, setImageSrc] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0, width: 160, height: 160 });

  const imageRef = useRef<HTMLImageElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const downloadImage = async () => {
      const blob = new Blob([file], { type: file.type });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        setImageSrc(url);
      };

      img.src = url;
    };

    downloadImage();
  }, [file]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const offsetX = event.clientX - dragStart.x;
        const offsetY = event.clientY - dragStart.y;
        const newSelectionPosition = { ...selectionPosition };

        newSelectionPosition.x += offsetX;
        newSelectionPosition.y += offsetY;
        setSelectionPosition(newSelectionPosition);
        setDragStart({ x: event.clientX, y: event.clientY });
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, dragStart, selectionPosition]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleSaveClick = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const selectionElement = selectionRef.current;
    const imageElement = imageRef.current;

    if (context && selectionElement && imageElement) {
      const { x, y, width, height } = selectionPosition;

      canvas.width = width;
      canvas.height = height;
      context.drawImage(imageElement, x, y, width, height, 0, 0, width, height);
      onSave(canvas.toDataURL());
    }
  };

  const renderSelection = () => {
    const { x, y, width, height } = selectionPosition;

    const style = {
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: selectionType === 'circle' ? '50%' : '0',
    };

    return <div ref={selectionRef} className={styles.img__selection} style={style} />;
  };

  return (
    <>
      <div className={styles.img__selector} onMouseDown={handleMouseDown}>
        <div className={styles.img__wrapper}>
          <img ref={imageRef} src={imageSrc} alt='Selected' />
        </div>
        {renderSelection()}
      </div>
      <button type='button' onClick={handleSaveClick}>
        Save
      </button>
    </>
  );
};
