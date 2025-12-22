"use client";

import { useEffect, useRef } from "react";
import styles from "./ConfirmModal.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소",
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClick={handleBackdropClick}
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={styles.confirmButton}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </dialog>
  );
}
