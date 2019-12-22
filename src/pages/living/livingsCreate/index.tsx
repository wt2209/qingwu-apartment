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

const { Step } = Steps;

interface Props extends FormComponentProps {
  options: OptionsType; // 基本信息中的可选项目，如所有公司、所有类型
  loading: boolean;
  dispatch: Dispatch<Action<'livingsCreate/getOptions'>>;
}

interface State {
  currentStep: number;
  basicInfo: Object;
  chargeRules: ChargeRule[];
  type: 'person' | 'company' | 'functional' | null;
  person: PersonListItem | null;
  company: CompanyListItem | null;
  filteredCompanies: Array<{ id: number; companyName: string }>;
  filteredCategories: Array<{ id: number; title: string; type: string }>;
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
    currentStep: 1,
    basicInfo: {},
    chargeRules: [
      {
        title: '租赁房租',
        costs: [600, 700, 800, 900],
        lateRate: 3,
      },
    ],
    type: null, // 当前选择的类型
    person: null, // 人员基本信息，与company二选一
    company: null, // 公司基本信息，与person二选一
    filteredCompanies: [], // 可选的公司
    filteredCategories: [], // 可选的类型
  };

  componentDidMount = () => {
    this.props.dispatch({ type: 'livingsCreate/getOptions' });
  };

  handleBasicInfoSubmit = (values: Object) => {
    this.setState({ basicInfo: values, currentStep: 1 });
  };

  handleChargeRulesSubmit = (values: ChargeRule[]) => {
    this.setState({ chargeRules: values, currentStep: 2 });
  };

  prevStep = () => {
    this.setState({ currentStep: this.state.currentStep - 1 });
  };

  render() {
    const { currentStep } = this.state;

    const mapper = [
      <Step1 onSubmit={this.handleBasicInfoSubmit} options={this.props.options} />,
      <Step2
        onSubmit={this.handleChargeRulesSubmit}
        options={this.props.options}
        data={this.state.chargeRules}
        prevStep={this.prevStep}
      />,
      <Step1 onSubmit={this.handleBasicInfoSubmit} options={this.props.options} />,
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
