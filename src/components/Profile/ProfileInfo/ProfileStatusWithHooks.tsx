import React, { ChangeEvent, useEffect, useState } from "react";

type ProfileStatusType = {
  status: string;
  updateStatus: (status: string) => void;
};

export const ProfileStatusWithHooks: React.FC<ProfileStatusType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const diactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && (
        <div>
          <b>Status</b>:
          <span onDoubleClick={activateEditMode}>
            {props.status || "-----"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            value={status}
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={diactivateEditMode}
          />
        </div>
      )}
    </div>
  );
};
