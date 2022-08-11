import list from "../public/Valorala2-data/sources.json";
import Image from "next/image";
import logoPic from "../public/img/logo.svg";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Layout, Divider } from "antd";
import MyHeader from "./header";
import { Card, Descriptions } from "antd";
import { Row, Col } from "antd";
import { List, Typography, Space, Tag } from "antd";
import MyCard from "./card";
const { Header, Content, Footer } = Layout;
const { Text, Link, Title, Paragraph } = Typography;

export default function Home() {
    const sources = list.sources;
    const listItems = sources.map((sources) => <li>{sources.name}</li>);

    return (
        <Layout>
            <MyHeader></MyHeader>
            <Content>
                <div className={styles.bigbox}>
                    <Image src={logoPic} />
                    <br />
                    <br />
                    <Title>Valorala2 API</Title>
                    <Title level={2}>开源 免费 可扩展 全自动 的API服务站</Title>
                </div>
                <Divider orientation="center">使用说明</Divider>
                <Row gutter={16} justify="space-evenly">
                    <Col span={11}>
                        <Card title="静态方法">
                            <Paragraph>
                                本网站源代码在<Text code>github</Text>上，通过
                                <Text code>github actions</Text>
                                进行定时抓取并提交<Text code>json数据</Text>至
                                <Text code>git库</Text>。
                                <br />
                                你可以直接读取<Text code>git库</Text>
                                中的<Text code>json数据</Text>
                                ，即<Text type="success">静态方式1</Text>，采用
                                <Text code>JsDelivr CDN</Text>加速；
                                <br />
                                网站将<Text code>json</Text>
                                数据列为静态资源，既可以通过网站获取，即
                                <Text type="success">静态方式2</Text>；
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col span={11}>
                        <Card title="动态方法">
                            <Paragraph>
                                如果想获得实时的数据，你可以使用
                                <Text code>网站动态api</Text>
                                ，网站将运行脚本直接抓取后返回消息，api地址为
                                <Text type="danger">动态方法3</Text>所列。
                                <br />
                                由于服务器载荷、响应速度、被爬取网站拦截等多种原因，请慎重使用并尽量少
                                <Text type="danger">动态方法</Text>！
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>
                <Divider orientation="center">API 一览</Divider>
                {sources.map((source) => (
                    <MyCard source={source}></MyCard>
                ))}
            </Content>
            <Footer></Footer>
        </Layout>
    );
}

// export async function getStaticProps() {
//     const listRawdata = readFileSync(DataPath + "/sources.json");
//     const list = JSON.parse(listRawdata);
//     const sources = list.sources;
//     return {
//         props: {
//             sources,
//         },
//     };
// }
