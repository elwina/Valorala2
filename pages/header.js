import { Layout, Menu } from "antd";
import styles from "../styles/MyHeader.module.css";
import Image from "next/image";
import logoPic from "../public/img/logo.svg";
import { Space, Row, Col } from "antd";

const { Header, Content, Footer } = Layout;

export default function MyHeader() {
    const items = [
        { label: "主页", key: "main" }, // 菜单项务必填写 key
        { label: "贡献", key: "contribute" },
        { label: "捐赠", key: "donate" },
        { label: "GitHub", key: "github" },
    ];
    return (
        <Header className={styles.header}>
            <Row>
                <Col span={8}>
                    <div className={styles.title}>
                        <Image src={logoPic} />
                    </div>
                </Col>
                <Col span={6} offset={10}>
                    <Menu
                        className={styles.nav}
                        mode="horizontal"
                        theme="light"
                        items={items}
                    ></Menu>
                </Col>
            </Row>
        </Header>
    );
}
