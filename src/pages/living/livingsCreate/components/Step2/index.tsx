import React, { Fragment } from 'react';
import { Form, Card, Input, Button, Modal, InputNumber, Row, Col, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import styles from '../../style.less';
import { ChargeRule } from '@/models/common';
import { OptionsType } from '../../model';

const fees = [
  {
    title: '租赁房租',
    costs: [900, 600, 700, 800],
    lateRate: 3, // 滞纳金（以百分比计）
  },
  {
    title: '租赁物业费',
    costs: [98],
    lateRate: 0,
  },
];

const itemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface Props extends FormComponentProps {
  options: OptionsType;
  data: ChargeRule[];
  prevStep: () => void;
  onSubmit: (values: ChargeRule[]) => void;
}

interface State {
  newTitle: string;
  data: ChargeRule[];
  addModalVisible: boolean;
}

class Step2 extends React.Component<Props, State> {
  state: State = {
    newTitle: '',
    data: [],
    addModalVisible: false,
  };

  componentDidMount = () => {
    this.setState({ data: this.props.data });
  };

  handleSubmit=(e:any)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        // this.props.onSubmit(result);
      }
    });
  }

  handleAddNewFee = () => {
    const { newTitle } = this.state;
    this.setState({
      data: [
        ...this.state.data,
        {
          title: newTitle,
          costs: [],
          lateRate: 0,
        },
      ],
      newTitle: '',
      addModalVisible: false,
    });
  };

  handleTitleChange = (title: string) => {
    this.setState({ newTitle: title });
  };

  handleCostsChange = (e: any, index: number) => {
    const values = e.target.value.split('\n');

    let lastRow = values[values.length - 1];
    const data = [...this.state.data];
    data[index].costs = [lastRow, ...values.slice(0, -1)];

    console.log(data[index].costs);
    this.setState({ data });
  };

  handleModalVisible = (flag: boolean) => {
    this.setState({ addModalVisible: flag });
  };

  renderCostsShow = (values: number[]) => {
    let str = '';
    for (let i = 1; i < values.length; i++) {
      str += values[i] + '\n';
    }
    str += values[0];
    return str;
  };

  renderTitle = (title: string) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>{title}</span>
        <Button type="link" style={{ height: 24 }}>
          删除
        </Button>
      </div>
    );
  };

  render() {
    const { data, newTitle } = this.state;
    const {
      prevStep,
      options: { feeTypes },
    } = this.props;

    const filteredOptions = feeTypes
      .filter(t => {
        // 是否已经存在
        const exists = data.some(d => d.title === t.title);
        return t.title.includes(newTitle) && !exists;
      })
      .map(t => (
        <Select.Option key={t.id} value={t.title}>
          {t.title}
        </Select.Option>
      ));

    return (
      <Fragment>
        <Form className={styles.stepForm} onSubmit={e => this.handleSubmit(e)}>
          {data.length > 0 ? (
            <Row gutter={16}>
              {data.map((fee, index) => (
                <Col key={index} span={12}>
                  <Card
                    key={index}
                    title={this.renderTitle(fee.title)}
                    size="small"
                    style={{ marginBottom: 16 }}
                  >
                    <Form.Item label="费用" {...itemLayout}>
                      <Input.TextArea
                        value={this.renderCostsShow(fee.costs)}
                        onChange={e => this.handleCostsChange(e, index)}
                        rows={5}
                        placeholder="一年的费用写一行"
                      />
                    </Form.Item>
                    <Form.Item label="每日滞纳金" {...itemLayout}>
                      <InputNumber defaultValue={3} min={0} max={100} />%
                    </Form.Item>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div style={{ fontSize: 16, textAlign: 'center' }}>不收费</div>
          )}
          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="link" onClick={() => this.handleModalVisible(true)}>
              添加一项费用
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="default" onClick={prevStep} style={{ marginRight: 8 }}>
              上一步
            </Button>
            <Button type="primary" htmlType="submit">
              下一步
            </Button>
          </Form.Item>
        </Form>

        <Modal
          title="添加一项费用"
          visible={this.state.addModalVisible}
          onOk={this.handleAddNewFee}
          onCancel={() => this.handleModalVisible(false)}
        >
          <Form.Item label="费用名称">
            <Select
              showSearch={true}
              style={{ width: '100%' }}
              value={newTitle}
              onChange={this.handleTitleChange}
              notFoundContent={null}
            >
              {filteredOptions}
            </Select>
          </Form.Item>
        </Modal>
      </Fragment>
    );
  }
}

export default Form.create<Props>()(Step2);
