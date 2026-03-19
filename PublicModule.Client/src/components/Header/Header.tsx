import { useMemo } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames";
import { FacebookLogo } from "assets/facebookLogo";
import { Avatar, Button, Input, Tabs, Tooltip } from "antd";
import {
  BellOutlined,
  HomeOutlined,
  MenuOutlined,
  MessageOutlined,
  PlaySquareOutlined,
  RocketOutlined,
  SearchOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useHeader } from "./HeaderHooks";

export const Header = () => {
  const { activeKey, handleChangeActiveKey, user } = useHeader();

  const items = useMemo(
    () => [
      {
        key: "home",
        label: (
          <Tooltip
            title="Home"
            placement="bottom"
            color="var(--primary-color)"
            align={{ offset: [0, 23] }}
          >
            <HomeOutlined
              className={styles.tabIcon}
              style={{
                color: activeKey === "home" ? "var(--primary-color)" : "gray",
              }}
            />
          </Tooltip>
        ),
        value: "home",
      },
      {
        key: "watch",
        label: (
          <Tooltip
            title="Watch"
            placement="bottom"
            color="var(--primary-color)"
            align={{ offset: [0, 23] }}
          >
            <PlaySquareOutlined
              className={styles.tabIcon}
              style={{
                color: activeKey === "watch" ? "var(--primary-color)" : "gray",
              }}
            />
          </Tooltip>
        ),
        value: "watch",
      },
      {
        key: "marketplace",
        label: (
          <Tooltip
            title="Marketplace"
            placement="bottom"
            color="var(--primary-color)"
            align={{ offset: [0, 23] }}
          >
            <ShopOutlined
              className={styles.tabIcon}
              style={{
                color:
                  activeKey === "marketplace" ? "var(--primary-color)" : "gray",
              }}
            />
          </Tooltip>
        ),
        value: "marketplace",
      },
      {
        key: "groups",
        label: (
          <Tooltip
            title="Groups"
            placement="bottom"
            color="var(--primary-color)"
            align={{ offset: [0, 23] }}
          >
            <UsergroupAddOutlined
              className={styles.tabIcon}
              style={{
                color: activeKey === "groups" ? "var(--primary-color)" : "gray",
              }}
            />
          </Tooltip>
        ),
        value: "groups",
      },
      {
        key: "gaming",
        label: (
          <Tooltip
            title="Gaming"
            placement="bottom"
            color="var(--primary-color)"
            align={{ offset: [0, 23] }}
          >
            <RocketOutlined
              className={styles.tabIcon}
              style={{
                color: activeKey === "gaming" ? "var(--primary-color)" : "gray",
              }}
            />
          </Tooltip>
        ),
        value: "gaming",
      },
    ],
    [activeKey]
  );

  return (
    <div className="header">
      <div className={classNames(styles.container, "header-container")}>
        <div className={classNames(styles.item, styles.left)}>
          <div className={styles.logo}>
            <FacebookLogo />
          </div>
          <div className={styles.search}>
            <Input
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined />}
              className={styles.searchInput}
            />
          </div>
        </div>
        <div className={classNames(styles.item, styles.center)}>
          <Tabs
            size="large"
            items={items}
            defaultActiveKey="1"
            onChange={(key) => {
              handleChangeActiveKey(key);
            }}
          />
        </div>
        <div className={classNames(styles.item, styles.right)}>
          <Button
            icon={<MenuOutlined />}
            shape="circle"
            className={styles.buttonHeader}
            size="large"
          />
          <Button
            icon={<MessageOutlined />}
            shape="circle"
            className={styles.buttonHeader}
            size="large"
          />
          <Button
            icon={<BellOutlined />}
            shape="circle"
            className={styles.buttonHeader}
            size="large"
          />
          <Avatar
            src="https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/604833917_122233025402164346_3231059050864155223_n.jpg?stp=dst-jpg_p480x480_tt6&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1W4DhgSs3KgQ7kNvwGihvD2&_nc_oc=AdlPgnZHRx9LGsJS-OpQHIBv8MTaf-TL82-TfP99QJLb43SQmfr9hSZwQZv-tT7Vg9E&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=9aSIc3kkE5h0tOaILiBTXg&oh=00_AfkpDuzl7v-f1x8Q-YI8g2xvIaMdRlEwLD6HorpgftsclQ&oe=69529902"
            size={40}
          />
        </div>
      </div>
    </div>
  );
};
