import React, { Fragment } from 'react';
import { Form, Select, Input, Button, Divider, Radio, Spin, DatePicker, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import styles from '../../style.less';

const itemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

interface Props extends FormComponentProps {}

const Step3: React.FC<Props> = (props: Props) => 'step3';

export default Form.create<Props>()(Step3);
