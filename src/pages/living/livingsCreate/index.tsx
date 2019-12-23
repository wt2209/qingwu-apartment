import React from 'react';
import { Form, Steps, Card, Spin } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Dispatch, Action } from 'redux';
import { OptionsType, ModelState } from './model';
import { PersonListItem } from '../people/data.d';
import { CompanyListItem } from '../companies/data.d';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import { ChargeRule } from '@/models/common';
import Step3 from './components/Step3';

const { Step } = Steps;

export interface BasicInfoType {
  type: 'person' | 'company' | 'functional';
  category: number | undefined;
  rentStart?: string;
  rentEnd?: string;
  person?: PersonListItem;
  company?: CompanyListItem;
  remark: string;
}

interface Props extends FormComponentProps {
  options: OptionsType; // 基本信息中的可选项目，如所有公司、所有类型
  loading: boolean;
  dispatch: Dispatch<Action<'livingsCreate/getOptions'>>;
}

interface State {
  currentStep: number;
  basicInfo: BasicInfoType;
  chargeRules: ChargeRule[];
}

@connect(
  ({
    livingsCreate,
    loading,
  }: {
    livingsCreate: ModelState;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    options: livingsCreate.options,
    loading: loading.models.livingsCreate,
  }),
)
class LivingCreate extends React.Component<Props, State> {
  state: State = {
    currentStep: 2,
    basicInfo: {
      type: 'person',
      category: undefined,
      rentStart: '2013-12-12',
      rentEnd: '2019-8-12',
      remark: '',
    },
    chargeRules: [
      {
        title: '租赁房租',
        costs: [600, 700, 800, 900],
        lateRate: 3,
      },
    ],
  };

  componentDidMount = () => {
    this.props.dispatch({ type: 'livingsCreate/getOptions' });
  };

  handleBasicInfoSubmit = (values: BasicInfoType) => {
    this.setState({ basicInfo: values, currentStep: 1 });
  };

  handleChargeRulesSubmit = (values: ChargeRule[]) => {
    this.setState({ chargeRules: values }, () => {
      console.log(this.state);
    });
  };

  prevStep = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: currentStep - 1 });
  };

  render() {
    const { currentStep, basicInfo, chargeRules } = this.state;

    const mapper = [
      <Step1 data={basicInfo} onSubmit={this.handleBasicInfoSubmit} options={this.props.options} />,
      <Step2
        onSubmit={this.handleChargeRulesSubmit}
        options={this.props.options}
        data={chargeRules}
        prevStep={this.prevStep}
      />,
      <Step3 />,
    ];

    return (
      <PageHeaderWrapper title={false}>
        <Card>
          <Steps style={{ maxWidth: 1000, margin: '0 auto', paddingTop: 16 }} current={currentStep}>
            <Step title="填写基本信息" />
            <Step title="设置收费规则" />
            <Step title="上传入住凭证" />
            <Step title="完成" />
          </Steps>
          <Spin spinning={this.props.loading}>{mapper[currentStep]}</Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<Props>()(LivingCreate);
