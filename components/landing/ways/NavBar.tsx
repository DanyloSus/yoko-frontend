type NavBarProps = {
  page: number; //active page
  setNewPage: (newPage: number) => void; //functional to change active page
};

const NavBar = (props: NavBarProps) => {
  return (
    <div className="relative">
      <div
        className="w-[46px] h-[46px] rounded-full bg-blue-marguerite-300 absolute top-1/2 -translate-y-1/2 transition-all"
        style={{
          left: `${60 * props.page}px`,
        }}
      />
      <div className="flex items center gap-[30px] text-[52px] relative z-10 px-2 pb-2">
        <button
          onClick={() => {
            props.setNewPage(0);
          }}
        >
          <h5>1</h5>
        </button>
        <button
          onClick={() => {
            props.setNewPage(1);
          }}
        >
          <h5>2</h5>
        </button>
        <button
          onClick={() => {
            props.setNewPage(2);
          }}
        >
          <h5>3</h5>
        </button>
        <button
          onClick={() => {
            props.setNewPage(3);
          }}
        >
          <h5>4</h5>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
