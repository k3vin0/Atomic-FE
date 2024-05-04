import { FC } from "react";
import ATChat from "../../components/ATChat/ATChat";

export type ChatPageProps = {
  // Define your props here
};

export const ChatPage: FC<ChatPageProps> = () => {
  return (
    <div className="mt-1 lg:w-10/12 h-full p-4">
      <ATChat />
    </div>
  );
};

export default ChatPage;
