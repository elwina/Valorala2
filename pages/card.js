import "antd/dist/antd.css";
import { Layout, Divider } from "antd";
import MyHeader from "./header";
import { Card, Descriptions, Popover } from "antd";
import { Row, Col } from "antd";
import { List, Typography, Space, Tag } from "antd";
import {
    CopyTwoTone,
    LoadingOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "../styles/MyCard.module.css";
const { Header, Content, Footer } = Layout;
const { Text, Link } = Typography;

export default function MyCard(props) {
    const source = props.source;
    return (
        <Row className={styles.listrow} justify="space-around">
            <Col span={22}>
                <Card
                    title={
                        <Space split={<Divider type="vertical" />}>
                            {source.name}
                            {source.info}
                            <Level level={source.level} />
                        </Space>
                    }
                >
                    <List>
                        <List.Item>
                            <Space>
                                <Text type="success">静态方式1</Text>
                                <Text
                                    code
                                >{`https://cdn.jsdelivr.net/gh/elwina/Valorala2-data@latest/${source.name}.json`}</Text>
                                <Clip
                                    target={`https://cdn.jsdelivr.net/gh/elwina/Valorala2-data@latest/${source.name}.json`}
                                />
                            </Space>
                        </List.Item>
                        <List.Item>
                            <Space>
                                <Text type="success">静态方式2</Text>
                                <Text
                                    code
                                >{`https://valorala2.vercel.app/Valorala2-data/${source.name}.json`}</Text>
                                <Clip
                                    target={`https://valorala2.vercel.app/Valorala2-data/${source.name}.json`}
                                />
                            </Space>
                        </List.Item>
                        <List.Item>
                            <Space>
                                <Text type="danger">动态方式3</Text>
                                <Text
                                    code
                                >{`https://valorala2.vercel.app/api/data/${source.name}`}</Text>
                                <Clip
                                    target={`https://valorala2.vercel.app/api/data/${source.name}`}
                                />
                            </Space>
                        </List.Item>
                    </List>
                </Card>
            </Col>
        </Row>
    );
}

const levels = [
    "disabled",
    "daily",
    "medium",
    "quick",
    "super",
    "ultra",
    "hyper",
];
const levelsColor = [
    "",
    "blue",
    "cyan",
    "gold",
    "volcano",
    "magenta",
    "purple",
];
export function Level(props) {
    const level = props.level;
    return <Tag color={levelsColor[level]}>{levels[level]}</Tag>;
}

export function Clip(props) {
    const target = props.target;
    return (
        <CopyToClipboard onCopy={""} text={target}>
            <Popover trigger="click" content="已复制">
                <CopyTwoTone />
            </Popover>
        </CopyToClipboard>
    );
}
