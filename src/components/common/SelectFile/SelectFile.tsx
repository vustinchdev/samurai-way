import React, { ChangeEvent } from "react";
import s from "./SelectFile.module.css";

type Props = {
  savePhoto: (file: File) => void;
};

export const SelectFile = ({ savePhoto }: Props) => {
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };

  return (
    <div className={s.selectFileBlock}>
      <label htmlFor={"files"} className={s.btn}>
        Select Image
      </label>
      <input
        id="files"
        type="file"
        onChange={onMainPhotoSelected}
        className={s.inp}
      />
    </div>
  );
};
