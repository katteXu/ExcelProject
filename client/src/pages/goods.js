import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Button, Table } from 'antd';

import { getDate, getGoods, getData } from '../api'
import { setTimeout } from 'core-js';
const { Option } = Select;


const columns = [
  {
    title: '商品标题',
    dataIndex: '商品标题',
    key: 'title',
    width: 500,
    render(value, record) {
      return <a target="_blank" href={record['商品链接']}>{value}</a>
    }
  },
  {
    title: '原价（元）',
    dataIndex: '原价',
    key: 'price',
  },
  {
    title: "折扣价（元）",
    dataIndex: "折扣价",
    key: "zkj",
  },
  {
    title: "地址",
    dataIndex: "地址",
    key: 'address',
  },

  {
    title: "销量",
    dataIndex: "销量",
    key: "num"
  }
]



export default () => {
  const [dateList, setDateList] = useState([]);
  const [goodList, setGoodList] = useState([]);
  const [date, setDate] = useState();
  const [good, setGood] = useState();
  const [dataSource, setData] = useState([]);
  useEffect(() => {
    getDate().then((res) => {
      setDateList(res)
    });
  }, []);


  const handleChangeDate = ({ key }) => {
    setDate(key);
    getGoods(key).then(res => {
      setGoodList(res);
    })
  }

  const handleChangeGood = ({ key }) => {
    setGood(key);
    getData(date, key).then(res => {
      setData(res);
    });
  }

  const maxPrice = () => {
    const result = dataSource.sort((a, b) => {
      return b['销量'] - a['销量'];
    });
    setData([]);
    setTimeout(() => {
      setData(result)
    }, 0)
  }
  
  return (
    <div>
      <Row>
        <Col span={6}>
          <Select
            placeholder="请选择日期"
            labelInValue
            style={{ width: 200 }}
            onChange={handleChangeDate} >
            {
              dateList.map(item => <Option value={item.key} key={item.key} >{item.text}</Option>)
            }

          </Select>
        </Col>
        <Col span={6}>
          <Select
            placeholder="请选择商品"
            labelInValue
            onChange={handleChangeGood}
            style={{ width: 200 }}>
            {
              goodList.map(item => <Option value={item.key} key={item.key}>{item.text}</Option>)
            }
          </Select>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={4}>
          <span>日期：</span>
          <span style={{ color: "blue" }}>{date}</span>
        </Col>
        <Col span={4}>
          <span>商品：</span>
          <span style={{ color: "blue" }}>{good}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button.Group>
            <Button type="link" onClick={maxPrice}>销量最好</Button>
          </Button.Group>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col>
          <Table bordered dataSource={dataSource} columns={columns} rowKey="商品标题"></Table>
        </Col>
      </Row>
    </div>

  )
}