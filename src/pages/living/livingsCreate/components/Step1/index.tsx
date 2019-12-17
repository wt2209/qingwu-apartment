import React, { Fragment } from 'react';
import { Form, Select, Input, Button, Radio, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import styles from '../../style.less';
import { OptionsType } from '../../model';

const itemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

interface Props extends FormComponentProps {
  options: OptionsType;
}
interface State {
  type: 'person' | 'company' | 'functional' | null;
  filteredCompanies: Array<{ id: number; companyName: string }>;
  filteredCategories: Array<{ id: number; title: string; type: string }>;
}

class Step1 extends React.Component<Props, State> {
  state: State = {
    type: 'person',
    filteredCategories: [],
    filteredCompanies: [],
  };

  handleTypeChange = (e: any) => {
    const type = e.target.value;
    const { categories } = this.props.options;
    const filteredCategories = categories.filter(c => c.type === type);
    this.setState({ filteredCategories, type });
  };

  componentDidMount = () => {
    const { type } = this.state;
    if (typeof type === 'string' && type) {
      const filteredCategories = this.props.options.categories.filter(c => c.type === type);
      this.setState({ filteredCategories });
    }
  };

  render() {
    const { filteredCategories, type } = this.state;

    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm}>
          <Form.Item {...itemLayout} label="属于">
            {getFieldDecorator('type', {
              initialValue: type,
              rules: [{ required: true, message: '必须选择' }],
            })(
              <Radio.Group style={{ marginLeft: 16 }} onChange={e => this.handleTypeChange(e)}>
                <Radio value="person">个人入住</Radio>
                <Radio value="company">公司或机构入住</Radio>
                <Radio value="functional">功能性用房</Radio>
              </Radio.Group>,
            )}
          </Form.Item>

          <Form.Item {...itemLayout} label="类型">
            {getFieldDecorator('category', {
              rules: [{ required: true, message: '必须选择' }],
            })(
              <Select>
                {filteredCategories.map(c => (
                  <Select.Option key={c.id} value={c.id}>
                    {c.title}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>

          {/* 个人入住基本信息 */}
          {type === 'person' && (
            <Fragment>
              <Form.Item {...itemLayout} label="身份证号">
                {getFieldDecorator('identify', {
                  rules: [{ required: true, message: '必须输入' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="姓名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '必须输入' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="工号">
                {getFieldDecorator('serial', {
                  rules: [],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="性别">
                {getFieldDecorator('gender', {
                  initialValue: '男',
                  rules: [{ required: true, message: '必须输入' }],
                })(
                  <Radio.Group style={{ marginLeft: 16 }}>
                    <Radio value="男">男</Radio>
                    <Radio value="女">女</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
              <Form.Item {...itemLayout} label="学历">
                {getFieldDecorator('education', {
                  initialValue: '其他',
                  rules: [{ required: true, message: '必须输入' }],
                })(
                  <Radio.Group style={{ marginLeft: 16 }}>
                    <Radio value="本科">本科</Radio>
                    <Radio value="研究生">研究生</Radio>
                    <Radio value="博士">博士</Radio>
                    <Radio value="其他">其他</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
              <Form.Item {...itemLayout} label="电话">
                {getFieldDecorator('phone')(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="部门">
                {getFieldDecorator('department')(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="入职时间">
                {getFieldDecorator('hiredAt')(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="入住时间">
                {getFieldDecorator('enteredAt')(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="劳动合同">
                {getFieldDecorator('contractStart')(<DatePicker.RangePicker format="YYYY-MM-DD" />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="租期">
                {getFieldDecorator('contractEnd')(<DatePicker.RangePicker format="YYYY-MM-DD" />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="籍贯">
                {getFieldDecorator('origin')(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="紧急联系人">
                {getFieldDecorator('emergencyPerson')(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="联系人电话">
                {getFieldDecorator('emergencyPhone')(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="备注">
                {getFieldDecorator('remark')(<Input.TextArea />)}
              </Form.Item>
            </Fragment>
          )}

          {/* 公司入住基本信息 */}
          {type === 'company' && (
            <Fragment>
              <Form.Item {...itemLayout} label="公司名">
                {getFieldDecorator('companyName', {
                  rules: [{ required: true, message: '必须输入' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="负责人">
                {getFieldDecorator('manager', {
                  rules: [{ required: true, message: '必须输入' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="负责人电话">
                {getFieldDecorator('managerPhone', {
                  rules: [],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="日常联系人">
                {getFieldDecorator('linkman', {
                  rules: [],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="联系人电话">
                {getFieldDecorator('linkmanPhone', {
                  rules: [],
                })(<Input />)}
              </Form.Item>

              <Form.Item {...itemLayout} label="房间入住日">
                {getFieldDecorator('enteredAt')(<DatePicker format="YYYY-MM-DD" />)}
              </Form.Item>

              <Form.Item {...itemLayout} label="备注">
                {getFieldDecorator('remark')(<Input.TextArea />)}
              </Form.Item>
            </Fragment>
          )}

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: 5,
                offset: 5,
              },
            }}
            label=""
          >
            <Button type="primary">下一步</Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default Form.create<Props>()(Step1);
