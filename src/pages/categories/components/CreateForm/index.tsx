import { Modal, Form, Steps, Button, Select, Radio, Input, DatePicker } from 'antd';
import React from 'react';
import { FormComponentProps } from 'antd/es/form';

interface FormValueType {}
interface Props extends FormComponentProps {
  modelVisible: boolean;
  handleAdd: (values: {}) => void;
  handleModalVisible: (flag: boolean) => void;
}
interface State {
  formValues: FormValueType;
  currentStep: number;
}

const { Step } = Steps;
const { Option } = Select;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class CreateForm extends React.Component<Props, State> {
  state: State = {
    formValues: {},
    currentStep: 0,
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  okHandler = () => {};

  handleNext = (currentStep: number) => {
    const { form, handleAdd } = this.props;
    const { formValues: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formValues = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formValues,
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          } else {
            handleAdd(formValues);
          }
        },
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderContent = (currentStep: number, formVals: FormValueType) => {
    const { form } = this.props;
    if (currentStep === 1) {
      return [
        <FormItem key="target" {...this.formLayout} label="监控对象">
          {form.getFieldDecorator('target', {
            initialValue: formVals.target,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="0">表一</Option>
              <Option value="1">表二</Option>
            </Select>,
          )}
        </FormItem>,
        <FormItem key="template" {...this.formLayout} label="规则模板">
          {form.getFieldDecorator('template', {
            initialValue: formVals.template,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="0">规则模板一</Option>
              <Option value="1">规则模板二</Option>
            </Select>,
          )}
        </FormItem>,
        <FormItem key="type" {...this.formLayout} label="规则类型">
          {form.getFieldDecorator('type', {
            initialValue: formVals.type,
          })(
            <RadioGroup>
              <Radio value="0">强</Radio>
              <Radio value="1">弱</Radio>
            </RadioGroup>,
          )}
        </FormItem>,
      ];
    }

    return [
      <FormItem key="name" {...this.formLayout} label="名称">
        {form.getFieldDecorator('title', {
          rules: [{ required: true, message: '请输入类型名称！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="desc" {...this.formLayout} label="属于">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '必须选择' }],
        })(
          <RadioGroup>
            <Radio value="person">个人入住</Radio>
            <Radio value="company">公司或机构入住</Radio>
          </RadioGroup>,
        )}
      </FormItem>,
      <FormItem key="name" {...this.formLayout} label="水电费收费">
        {form.getFieldDecorator('utilityType', {
          rules: [],
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="name" {...this.formLayout} label="备注">
        {form.getFieldDecorator('remark', {
          rules: [],
        })(<TextArea placeholder="请输入" />)}
      </FormItem>,
    ];
  };

  renderFooter = (currentStep: number) => {
    const { handleModalVisible } = this.props;
    if (currentStep === 1) {
      return [
        <Button key="back" onClick={this.backward}>
          上一步
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleModalVisible(false)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { modelVisible, handleModalVisible, handleAdd, form } = this.props;
    const { currentStep, formValues } = this.state;
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="规则配置"
        visible={modelVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleModalVisible(false)}
        afterClose={() => handleModalVisible(false)}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="基本信息" />
          <Step title="设置收费规则" />
          <Step title="完成" />
        </Steps>
        {this.renderContent(currentStep, formValues)}
      </Modal>
    );
  }
}

export default Form.create<Props>()(CreateForm);
