import "./HomePage.module.scss";
import styles from "./HomePage.module.scss";
import { Sidebar, Snake } from "components";
import { useHomePage } from "./HomePageHooks";

const HomePage = () => {
  return (
    <div className="app">
      <div className="appBody">
        <div className={styles.wrapperApp}>
          <Sidebar />
          {/* <Snake /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
