import React from "react";
import { Button, Card, Dropdown, Popover, Space, Typography } from "antd";
import styles from "./LandingPage.module.scss";
import CardStack from "./CardStack";

const LandingPage = () => {
  return (
    <div className={styles.wrapperContainer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.menuHeader}>
            <div className={styles.menuHeaderLeft}>
              <div className={styles.imageLogo}>
                <img
                  src={
                    "https://static-assets.prepcdn.com/content-management-system/PREP_dark_layout_64f2314598.png"
                  }
                  alt="logo"
                />
              </div>
              <div className={styles.menuHeaderItems}>
                <div className={styles.menuHeaderItem}>
                  <Popover
                    title={<p className={styles.menuHeaderText}>Khóa học</p>}
                    content={
                      <div>
                        <p style={{ color: "white" }}>Khóa học</p>
                        <p style={{ color: "white" }}>Khóa học</p>
                      </div>
                    }
                    align={{ offset: [0, -20] }}
                    arrow={false}
                    color={"#011842"}
                  >
                    <p className={styles.menuHeaderText}>Khóa học</p>
                  </Popover>
                </div>
                <div className={styles.menuHeaderItem}>
                  <p className={styles.menuHeaderText}>Kiểm tra đầu vào</p>
                </div>
                <div className={styles.menuHeaderItem}>
                  <p className={styles.menuHeaderText}>Luyện đề</p>
                </div>
                <div className={styles.menuHeaderItem}>
                  <a href="#" className={styles.menuHeaderText}>
                    Doanh nghiệp
                  </a>
                </div>
                <div className={styles.menuHeaderItem}>
                  <a href="#" className={styles.menuHeaderText}>
                    Từ điển
                  </a>
                </div>
                <div className={styles.menuHeaderItem}>
                  <p className={styles.menuHeaderText}>Blog</p>
                </div>
                <div className={styles.menuHeaderItem}>
                  <p className={styles.menuHeaderText}>Tin tức</p>
                </div>
              </div>
            </div>
            <div className={styles.menuHeaderRight}>
              <div className={styles.menuButton}>
                <Button type="primary" className={styles.buttonStart}>
                  Bắt đầu
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.headerTitle}>
            <h1 style={{ fontSize: "100px", color: "white" }}>Nền tảng Học</h1>
            <h1
              style={{ fontSize: "100px", color: "white", marginTop: "-50px" }}
            >
              và Luyện thi
            </h1>
            <h1
              style={{ fontSize: "100px", color: "white", marginTop: "-50px" }}
            >
              thông minh
            </h1>
            <Button
              type="default"
              style={{
                height: "50px",
                width: "200px",
                borderRadius: "50px",
                fontSize: "20px",
                fontWeight: "600",
              }}
              onClick={() => {
                const section = document.getElementById("target-section");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Khám phá ngay
            </Button>
          </div>
        </div>

        <div id="target-section" className={styles.header}>
          <h1>✨ Sticky Cards Effect</h1>
          <p>Scroll down để xem hiệu ứng</p>
        </div>

        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <span className={styles.number}>01</span>
            <h2>🚀 Card đầu tiên</h2>
            <p>
              Card này sẽ sticky ở top: 50px. Khi bạn scroll xuống, nó sẽ "dính"
              lại ở vị trí này cho đến khi card tiếp theo đẩy nó lên.
            </p>
            <p style={{ marginTop: "15px" }}>
              Scroll tiếp để xem card 2 xuất hiện từ phía dưới và đẩy card này
              đi.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.number}>02</span>
            <h2>🎨 Card thứ hai</h2>
            <p>
              Card này có top: 100px (cao hơn card 1). Khi xuất hiện, nó sẽ đẩy
              card 1 lên trên và chiếm vị trí sticky của nó.
            </p>
            <p style={{ marginTop: "15px" }}>
              Card 1 sẽ tiếp tục scroll lên cho đến khi biến mất khỏi màn hình.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.number}>03</span>
            <h2>💎 Card thứ ba</h2>
            <p>
              Card cuối cùng có top: 150px (cao nhất). Nó sẽ đẩy cả 2 card trước
              đó lên và chiếm lấy vị trí.
            </p>
            <p style={{ marginTop: "15px" }}>
              Đây là hiệu ứng "sticky stacking" - một technique phổ biến trong
              modern web design!
            </p>
          </div>
        </div>

        <div className={styles.spacer}></div>
        <div className={styles.menuHeaderItem}>
          <div className={styles.menuHeaderItemIcon}>
            <img
              src={
                "https://static-assets.prepcdn.com/content-management-system/PREP_dark_layout_64f2314598.png"
              }
              alt="logo"
            />
          </div>
          <div className={styles.menuHeaderItemText}>
            <p>Home</p>
          </div>
        </div>

        <div className={styles.footer}>
          <h3>🎉 Đã cuộn hết!</h3>
          <p>Scroll lên để xem lại hiệu ứng</p>
        </div>
      </div>
    </div>

    // <CardStack />
  );
};

export default LandingPage;
