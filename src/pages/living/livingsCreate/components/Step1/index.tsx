import React, { Fragment } from 'react';
import { Form, Select, Input, Button, Radio, DatePicker, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import moment from 'moment';
import styles from '../../style.less';
import { OptionsType } from '../../model';
import { BasicInfoType } from '../..';

const itemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

interface Props extends FormComponentProps {
  data: BasicInfoType;
  options: OptionsType;
  onSubmit: (values: BasicInfoType) => void;
}
interface State {
  isUnfixedContract: boolean; // 是否是无固定期合同
  type: 'person' | 'company' | 'functional' | null;
  filteredCompanies: Array<{ id: number; companyName: string }>;
  filteredCategories: Array<{ id: number; title: string; type: string }>;
}

class Step1 extends React.Component<Props, State> {
  state: State = {
    isUnfixedContract: false,
    type: 'person',
    filteredCategories: [],
    filteredCompanies: [],
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // const { person } = values;
        // const { rentPeriod, ...rest } = person;
        const result = values;

        switch (values.type) {
          case 'person':
            if (this.state.isUnfixedContract && result.person.contractStart) {
              // 是无固定期劳动合同
              result.person.contractStart = result.person.contractStart.format('YYYY-MM-DD');
              result.person.contractEnd = '无固定期';
            } else {
              if (result.person.contractPeriod) {
                result.person.contractStart = result.person.contractPeriod[0].format('YYYY-MM-DD');
                result.person.contractEnd = result.person.contractPeriod[1].format('YYYY-MM-DD');
              }
              delete result.person.contractPeriod;
            }
            break;
          case 'company':
            break;

          case 'functional':
            break;

          default:
            break;
        }
        if (result.rentPeriod) {
          result.rentStart = result.rentPeriod[0].format('YYYY-MM-DD');
          result.rentEnd = result.rentPeriod[1].format('YYYY-MM-DD');
        }
        delete result.rentPeriod;

        this.props.onSubmit(result);
      }
    });
  };

  handleTypeChange = (e: any) => {
    const type = e.target.value;
    const { categories } = this.props.options;
    const filteredCategories = categories.filter(c => c.type === type);
    this.props.form.resetFields();
    this.setState({ filteredCategories, type });
  };

  handleUnfixedContractChange = (event: any) => {
    this.setState({ isUnfixedContract: event.target.checked });
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
    const { data } = this.props;

    return (
      <Fragment>
        <Form
          layout="horizontal"
          hideRequiredMark
          className={styles.stepForm}
          onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Item {...itemLayout} label="属于">
            {getFieldDecorator('type', {
              initialValue: data.type,
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
              initialValue: data.category,
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
                {getFieldDecorator('person.identify', {
                  initialValue: data.person ? data.person.identify : '',
                  rules: [{ len: 18, message: '身份证号必须是18位' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="姓名">
                {getFieldDecorator('person.name', {
                  initialValue: data.person ? data.person.name : '',
                  rules: [{ required: true, message: '必须输入' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="工号">
                {getFieldDecorator('person.serial', {
                  initialValue: data.person ? data.person.serial : '',
                  rules: [],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="性别">
                {getFieldDecorator('person.gender', {
                  initialValue: data.person ? data.person.gender : '男',
                  rules: [{ required: true, message: '必须输入' }],
                })(
                  <Radio.Group style={{ marginLeft: 16 }}>
                    <Radio value="男">男</Radio>
                    <Radio value="女">女</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
              <Form.Item {...itemLayout} label="学历">
                {getFieldDecorator('person.education', {
                  initialValue: data.person ? data.person.education : '其他',
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
                {getFieldDecorator('person.phone', {
                  initialValue: data.person ? data.person.phone : '',
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="部门">
                {getFieldDecorator('person.department', {
                  initialValue: data.person ? data.person.department : '',
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="入职时间">
                {getFieldDecorator('person.hiredAt', {
                  initialValue: data.person ? moment(data.person.hiredAt) : null,
                })(<DatePicker format="YYYY-MM-DD" />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="入住时间">
                {getFieldDecorator('person.enteredAt', {
                  initialValue: data.person ? moment(data.person.enteredAt) : null,
                })(<DatePicker format="YYYY-MM-DD" />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="劳动合同">
                {this.state.isUnfixedContract
                  ? getFieldDecorator('person.contractStart', {
                      initialValue: data.person ? moment(data.person.contractStart) : null,
                    })(<DatePicker placeholder="开始日期" format="YYYY-MM-DD" />)
                  : getFieldDecorator('person.contractPeriod', {
                      initialValue: data.person
                        ? [moment(data.person.contractStart), moment(data.person.contractEnd)]
                        : null,
                    })(<DatePicker.RangePicker format="YYYY-MM-DD" />)}
                <Checkbox
                  style={{ float: 'right' }}
                  defaultChecked={this.state.isUnfixedContract}
                  onChange={event => this.handleUnfixedContractChange(event)}
                >
                  无固定期
                </Checkbox>
              </Form.Item>

              <Form.Item {...itemLayout} label="籍贯">
                {getFieldDecorator('person.origin')(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="紧急联系人">
                {getFieldDecorator('person.emergencyPerson')(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="联系人电话">
                {getFieldDecorator('person.emergencyPhone')(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="人员说明">
                {getFieldDecorator('person.remark')(<Input />)}
              </Form.Item>
            </Fragment>
          )}

          {/* 公司入住基本信息 */}
          {type === 'company' && (
            <Fragment>
              <Form.Item {...itemLayout} label="公司名">
                {getFieldDecorator('company.companyName', {
                  rules: [{ required: true, message: '必须输入' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="负责人">
                {getFieldDecorator('company.manager', {
                  rules: [{ required: true, message: '必须输入' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="负责人电话">
                {getFieldDecorator('company.managerPhone', {
                  rules: [],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="日常联系人">
                {getFieldDecorator('company.linkman', {
                  rules: [],
                })(<Input />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="联系人电话">
                {getFieldDecorator('company.linkmanPhone', {
                  rules: [],
                })(<Input />)}
              </Form.Item>

              <Form.Item {...itemLayout} label="房间入住日">
                {getFieldDecorator('company.enteredAt')(<DatePicker format="YYYY-MM-DD" />)}
              </Form.Item>
              <Form.Item {...itemLayout} label="公司说明">
                {getFieldDecorator('company.remark')(<Input />)}
              </Form.Item>
            </Fragment>
          )}
          <Form.Item {...itemLayout} label="租期">
            {getFieldDecorator('rentPeriod', {
              initialValue: data.rentStart ? [moment(data.rentStart), moment(data.rentEnd)] : null,
            })(<DatePicker.RangePicker format="YYYY-MM-DD" />)}
          </Form.Item>
          <Form.Item {...itemLayout} label="备注">
            {getFieldDecorator('remark')(<Input.TextArea />)}
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              下一步
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default Form.create<Props>()(Step1);
