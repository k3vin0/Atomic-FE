import { FC, ReactNode } from "react";

export type LayoutProps = {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  content?: ReactNode;
};

export const Layout: FC<LayoutProps> = ({
  header,
  sidebar,
  content,
  footer,
}) => {
  const Header = () => {
    return (
      <div className="bg-blue-500 text-white p-4 fixed top-0 left-0 right-0 z-10">
        {header}
      </div>
    );
  };

  const Sidebar = () => {
    return (
      <div className="bg-green-500 h-full p-4 fixed inset-y-0 left-0 overflow-auto z-20 w-48 md:block hidden">
        {sidebar}
      </div>
    );
  };

  const Content = () => {
    return (
      <div className="h-full w-full text-white mt-14 overflow-auto md:ml-48">
        {content}
      </div>
    );
  };

  const Footer = () => {
    return <div className="bg-cyan-500 w-full text-white p-4">{footer}</div>;
  };
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex w-full h-full flex-row overflow-hidden">
        <Sidebar />
        <div className=" flex h-full flex-col w-full flex-1 ">
          <Content />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
