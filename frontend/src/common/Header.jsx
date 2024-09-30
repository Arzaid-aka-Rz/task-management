

const Header = () => {
  return (
    <header className="bg-[#f9f9f9]">
      <div className="px-6 my-3 w-full flex items-start justify-between ">
        <div>
          <h1 className="text-xl font-bold">
            <span>Welcome to Task Flow</span>
          </h1>

          <p className="text-sm">
            You have{" "}
            <span className="font-bold text-[#3aafae]">
              {/* {activeTasks.length} */}1
            </span>
            &nbsp;active tasks
          </p>
        </div>

<div className="flex gap-10 items-center">
<div className="h-[60px] flex items-center gap-[10.4rem]">
          <button
            className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
          >
            Add a new Task
          </button>
        </div>

</div>
        
      </div>

  
    </header>
  );
};

export default Header;
