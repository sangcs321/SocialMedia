import React from "react";

import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import styles from "./Sidebar.module.scss";
import { HomeOutlined } from "@ant-design/icons";
import { useSidebar } from "./Sidebarhooks";
import { useAppSelector } from "store/hooks";

export const Sidebar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className={styles.sidebarWrapper}>
      <SidebarItem
        src="https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/604833917_122233025402164346_3231059050864155223_n.jpg?stp=dst-jpg_p480x480_tt6&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1W4DhgSs3KgQ7kNvwGihvD2&_nc_oc=AdlPgnZHRx9LGsJS-OpQHIBv8MTaf-TL82-TfP99QJLb43SQmfr9hSZwQZv-tT7Vg9E&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=9aSIc3kkE5h0tOaILiBTXg&oh=00_AfkpDuzl7v-f1x8Q-YI8g2xvIaMdRlEwLD6HorpgftsclQ&oe=69529902"
        title={user?.name!}
        onClick={() => navigate("/")}
      />
      <SidebarItem
        src="https://static.xx.fbcdn.net/rsrc.php/v4/yt/r/rJ9k6SVFtYN.png"
        title="Meta AI"
      />
      <SidebarItem
        src="https://static.xx.fbcdn.net/rsrc.php/v4/yh/r/FlnJwE1zAUa.png"
        title="Friends"
      />
      <SidebarItem
        src="https://static.xx.fbcdn.net/rsrc.php/v4/yh/r/FlnJwE1zAUa.png"
        title="Memories"
      />
      <SidebarItem
        src="https://static.xx.fbcdn.net/rsrc.php/v4/yh/r/FlnJwE1zAUa.png"
        title="Saved"
      />
      <SidebarItem
        src="https://static.xx.fbcdn.net/rsrc.php/v4/yh/r/FlnJwE1zAUa.png"
        title="Groups"
      />
      <SidebarItem
        src="https://static.xx.fbcdn.net/rsrc.php/v4/yh/r/FlnJwE1zAUa.png"
        title="Watch"
      />
    </div>
  );
};
interface SidebarItemProps {
  src?: string;
  Icon?: React.ReactNode;
  title: string;
  onClick?: () => void;
}

const SidebarItem = (props: SidebarItemProps) => {
  const { src, Icon, title, onClick } = props;
  return (
    <div className={styles.sidebarRow} onClick={onClick}>
      <div className={styles.sidebarRowIcon}>
        {src && <Avatar src={src} size={40} />}
        {Icon && Icon}
        <h4>{title}</h4>
      </div>
    </div>
  );
};
