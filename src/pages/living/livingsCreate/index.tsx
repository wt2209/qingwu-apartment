import React, { Fragment } from 'react';
import {
  Form,
  Steps,
  Card,
  Select,
  Input,
  Button,
  Divider,
  Radio,
  Spin,
  DatePicker,
  Row,
  Col,
} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Dispatch, Action } from 'redux';
import styles from './style.less';
import { OptionsType, ModelState } from './model';
import { PersonListItem } from '../people/data.d';
import { CompanyListItem } from '../companies/data.d';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';

const { Step } = Steps;

interface Props extends FormComponentProps {
  options: OptionsType;
  loading: boolean;
  dispatch: Dispatch<Action<'livingsCreate/getOptions'>>;
}

interface State {
  currentStep: number;
  defaultValues: FormValueType;
  type: 'person' | 'company' | 'functional' | null;
  person: PersonListItem | null;
  company: CompanyListItem | null;
  filteredCompanies: Array<{ id: number; companyName: string }>;
  filteredCategories: Array<{ id: number; title: string; type: string }>;
}

interface FormValueType {}

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
    currentStep: 0,
    defaultValues: {},
    type: null, // 当前选择的类型
    person: null, // 人员基本信息，与company二选一
    company: null, // 公司基本信息，与person二选一
    filteredCompanies: [], // 可选的公司
    filteredCategories: [], // 可选的类型
  };

  componentDidMount = () => {
    this.props.dispatch({ type: 'livingsCreate/getOptions' });
  };

  render() {
    const { currentStep } = this.state;

    const mapper = [<Step1 options={this.props.options} />, <Step2 />, <Step2 />];

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
