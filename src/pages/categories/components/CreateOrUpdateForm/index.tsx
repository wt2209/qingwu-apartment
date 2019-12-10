import { Modal, Form, Steps, Button, Radio, Input } from 'antd';
import React from 'react';
import { FormComponentProps } from 'antd/es/form';
import FeeSetting from '@/components/FeeSetting';
import { CategoryStoreData } from '@/services/category';
import { CategoryTypeMapper } from '@/mappers';

export interface FormValueType {
  id: number;
  title: string;
  type: 'person' | 'company' | 'functional';
  utilityType: string;
  chargeRules: {
    [key: string]: number[];
  };
  remark: string;
}
interface Props extends FormComponentProps {
  modelVisible: boolean;
  defaultValues: FormValueType;
  handleSubmit: (values: CategoryStoreData) => void;
  handleModalHide: () => void;
}
interface State {
  formValues: FormValueType;
  currentStep: number;
}

const { Step } = Steps;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class CreateOrUpdateForm extends React.Component<Props, State> {
  feeFormRef = { submit: (result: any) => {} };

  state: State = {
    formValues: {
      id: 0,
      title: '',
      type: 'person',
      utilityType: '',
      chargeRules: {},
      remark: '',
    },
    currentStep: 0,
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount = () => {
    this.setState({
      currentStep: 0,
      formValues: this.props.defaultValues,
    });
  };

  handleNext = (currentStep: number) => {
    const { form } = this.props;
    const { formValues: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formValues = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formValues,
        },
        () => {
          if (currentStep < 1) {
            this.forward();
          }
        },
      );
    });
  };

  handleComplete = () => {
    this.feeFormRef.submit((result: any) => {
      const values = {
        ...this.state.formValues,
        id: this.props.defaultValues.id,
        chargeRules: result,
      };
      this.setState({
        formValues: {
          id: 0,
          title: '',
          type: 'person',
          utilityType: '',
          chargeRules: {},
          remark: '',
        },
        currentStep: 0,
      });
      this.props.handleSubmit(values);
    });
  };

  handleModalHide = () => {
    this.setState({
      formValues: {
        id: 0,
        title: '',
        type: 'person',
        utilityType: '',
        chargeRules: {},
        remark: '',
      },
      currentStep: 0,
    });
    this.props.handleModalHide();
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
        <FeeSetting
          fees={formVals.chargeRules}
          key="feeForm"
          wrappedComponentRef={(form: any) => (this.feeFormRef = form)}
        />,
      ];
    }

    return [
      <FormItem key="title" {...this.formLayout} label="名称">
        {form.getFieldDecorator('title', {
          initialValue: formVals.title,
          rules: [{ required: true, message: '请输入类型名称！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="desc" {...this.formLayout} label="属于">
        {form.getFieldDecorator('type', {
          initialValue: formVals.type,
          rules: [{ required: true, message: '必须选择' }],
        })(
          <RadioGroup>
            <Radio value="person">{CategoryTypeMapper.person}</Radio>
            <Radio value="company">{CategoryTypeMapper.company}</Radio>
            <Radio value="functional">{CategoryTypeMapper.functional}</Radio>
          </RadioGroup>,
        )}
      </FormItem>,
      <FormItem key="utilityType" {...this.formLayout} label="水电费收费">
        {form.getFieldDecorator('utilityType', {
          initialValue: formVals.utilityType,
          rules: [],
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="remark" {...this.formLayout} label="备注">
        {form.getFieldDecorator('remark', {
          initialValue: formVals.remark,
          rules: [],
        })(<TextArea placeholder="请输入" />)}
      </FormItem>,
    ];
  };

  renderFooter = (currentStep: number) => {
    if (currentStep === 1) {
      return [
        <Button key="back" onClick={this.backward}>
          上一步
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleComplete()}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={this.handleModalHide}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { modelVisible, defaultValues } = this.props;
    const { currentStep } = this.state;
    return (
      <Modal
        width={800}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="规则配置"
        visible={modelVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={this.handleModalHide}
        afterClose={this.handleModalHide}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="基本信息" />
          <Step title="设置收费规则" />
          <Step title="完成" />
        </Steps>
        {this.renderContent(currentStep, defaultValues)}
      </Modal>
    );
  }
}

export default Form.create<Props>()(CreateOrUpdateForm);
