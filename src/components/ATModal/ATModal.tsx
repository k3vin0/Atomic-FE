import { FC, ReactNode } from "react";

export type ATModalProps = {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
};

export const ATModal: FC<ATModalProps> = ({
  header,
  body,
  footer,
  isOpen,
  closeModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto flex">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="relative p-5 md:p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg z-10">
        <div className="text-xl font-bold mb-4">{header}</div>
        <div className="mb-8">{body}</div>
        <div className="flex justify-end">{footer}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
          className="absolute top-0 right-0 mt-4 mr-4"
        >
          <span className="text-gray-400 hover:text-gray-600">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default ATModal;
