import { useLocation, useNavigate } from "react-router-dom";

const C_sideBar = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  const navigate = useNavigate();

  const sideBarList = [
    { name: "Create Activity", path: "/dashboard/clerk/create-activity" },
    { name: "Student Register", path: "/dashboard/clerk" },
  ];

  return (
    <div>
      <div className="text-3xl p-3 border-b-2 border-b-primary">CU_CONNECT</div>
      {sideBarList.map((item) => {
        return (
          <div
            className={item.path === pathname ? "bg-secondary p-3 m-2 rounded-lg text-lg" : "bg-base-300 p-3 m-2 rounded-lg text-lg"}
            key={item.path}
            onClick={() => {
              navigate(item.path);
            }}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default C_sideBar;
