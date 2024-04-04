import "./App.css"; // Assuming you have an App.css for any additional styles

const Header = () => {
  return (
    <div className="bg-blue-500 text-white p-4 fixed top-0 left-0 right-0 z-10">
      Header
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="bg-green-500 h-screen p-4 fixed inset-y-0 left-0 overflow-auto z-20 w-48">
      Sidebar
    </div>
  );
};

const Content = () => {
  return (
    <div
      className="h-full w-full text-white"
      style={{ width: "100%", backgroundColor: "red" }}
    >
      Content
    </div>
    // <div className="flex-1 p-4 overflow-auto ml-48">
    //   <div className="bg-yellow-200 min-h-full">Content (scrollable)</div>
    // </div>
  );
};

const Footer = () => {
  return (
    <div
      className="bg-red-500 text-white p-4"
      style={{ width: "100%", backgroundColor: "green" }}
    >
      Footer
    </div>
  );
};

const App = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-screen h-screen  flex-row overflow-hidden">
        <Sidebar />
        <div className=" flex h-full flex-col w-full flex-1">
          <Content />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
