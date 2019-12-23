import React, { Fragment } from 'react';
import { Form, Card, Input, Button, Modal, InputNumber, Row, Col, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import styles from '../../style.less';
import { ChargeRule } from '@/models/common';
import { OptionsType } from '../../model';
import { isNumber } from '@/utils/tools';

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
  errors: Array<'error' | 'success'>; // 标明哪个数据有错误
  addModalVisible: boolean;
}

class Step2 extends React.Component<Props, State> {
  state: State = {
    newTitle: '',
    data: [],
    errors: [],
    addModalVisible: false,
  };

  componentDidMount = () => {
    this.setState({ data: this.props.data });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    if (this.state.errors.some(v => v === 'error')) {
      return;
    }
    let { data } = this.state;
    // 去除费用中的空值
    data = data.map(d => {
      const result = d;
      result.costs = d.costs.filter(c => c);
      return result;
    });
    // 去除没有费用的项目
    data = data.filter(d => d.costs.length > 0);

    this.props.onSubmit(data);
  };

  handleAddNewFee = () => {
    const { newTitle, data } = this.state;
    this.setState({
      data: [
        ...data,
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
    const { data } = this.state;
    const { errors } = this.state;
    errors[index] = values.some((v: string) => !isNumber(v)) ? 'error' : 'success';
    data[index].costs = values;
    this.setState({ data, errors });
  };

  handleRateChange = (value: number | undefined, index: number) => {
    const { data } = this.state;
    data[index].lateRate = value || 0;
    this.setState({ data });
  };

  handleModalVisible = (flag: boolean) => {
    this.setState({ addModalVisible: flag });
  };

  handleDelete = (index: number) => {
    const { data } = this.state;
    const newData = data.filter((d, i) => i !== index);
    this.setState({ data: newData });
  };

  renderTitle = (title: string, index: number) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>{title}</span>
      <Button type="link" onClick={() => this.handleDelete(index)} style={{ height: 24 }}>
        删除
      </Button>
    </div>
  );

  render() {
    const { data, newTitle, errors } = this.state;
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
                <Col key={`col${fee.title}`} span={12}>
                  <Card
                    key={`card${fee.title}`}
                    title={this.renderTitle(fee.title, index)}
                    size="small"
                    style={{ marginBottom: 16 }}
                  >
                    <Form.Item
                      validateStatus={errors[index] === 'error' ? 'error' : 'success'}
                      label="费用"
                      {...itemLayout}
                    >
                      <Input.TextArea
                        value={fee.costs.join('\n')}
                        onChange={e => this.handleCostsChange(e, index)}
                        rows={5}
                        placeholder="一年的费用写一行"
                      />
                    </Form.Item>
                    <Form.Item label="每日滞纳金" {...itemLayout}>
                      <InputNumber
                        defaultValue={fee.lateRate}
                        min={0}
                        max={100}
                        onChange={(value: number | undefined) =>
                          this.handleRateChange(value, index)
                        }
                      />
                      %
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
              showSearch
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
