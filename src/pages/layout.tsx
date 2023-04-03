import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabbar } from "react-vant";
import { ChatO, FriendsO } from "@react-vant/icons";
import { FC } from "react";

const tabs: any = [
  {
    url: "/",
    title: "index",
    icon: <ChatO />,
  },
  {
    url: "/translate",
    title: "translate",
    icon: <FriendsO />,
  },
];
const Layout: FC = function () {
  const navigator = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <Outlet></Outlet>
      <Tabbar
        defaultValue={pathname}
        fixed
        placeholder
        onChange={(val: any) => navigator(val)}
      >
        {tabs.map((item: any) => (
          <Tabbar.Item icon={item.icon} key={item.url} name={item.url}>
            {item.title}
          </Tabbar.Item>
        ))}
      </Tabbar>
    </>
  );
};

export default Layout;
