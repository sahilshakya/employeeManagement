const Navbar = () => {
  return (
    <div className="flex p-5 bg-slate-500 text-white">
      <h1>EmAPP</h1>

      <ul className=" flex mx-5">
        <li>Dashboard</li>
        <li>Employee List</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Navbar;
