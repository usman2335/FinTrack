import { Link, NavLink } from "react-router-dom";
import Logo from "../logo";
import {
  AppstoreOutlined,
  WalletOutlined,
  TransactionOutlined,
  LineChartOutlined,
  ReadOutlined,
  BulbOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "../Button/Button";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <AppstoreOutlined />,
      end: true,
    },
    {
      name: "Manage Finances",
      path: "/dashboard/finances",
      icon: <WalletOutlined />,
    },
    {
      name: "Transactions",
      path: "/dashboard/transactions",
      icon: <TransactionOutlined />,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: <LineChartOutlined />,
    },
    {
      name: "Financial Records",
      path: "/dashboard/records",
      icon: <ReadOutlined />,
    },
    {
      name: "Tips & Articles",
      path: "/dashboard/tips",
      icon: <BulbOutlined />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <div className="hidden md:block md:w-64 bg-tertiary-blue text-white h-screen p-6 space-y-4">
      <Logo className="text-4xl pl-2" />
      <ul className="space-y-2 mt-6">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.end}
              className={({ isActive }: { isActive: boolean }) =>
                `flex items-center gap-2 p-2 rounded  ${
                  isActive
                    ? "text-primary-blue font-semibold"
                    : "text-text-grey font-normal  hover:scale-105"
                }`
              }
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <span
                    className={`text-2xl rounded ${
                      isActive
                        ? "filter drop-shadow-[0_4px_1.1px_rgba(58,61,242,0.25)]"
                        : ""
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`rounded ${
                      isActive
                        ? "text-shadow-[0_4px_1.1px_rgba(58,61,242,0.25)]"
                        : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
        <li className="mt-6">
          <Link to="/">
            <Button text="Logout" color="bg-red-500 text-white" height="h-10" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
