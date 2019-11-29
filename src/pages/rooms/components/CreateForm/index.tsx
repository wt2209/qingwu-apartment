import { Modal, Card, Form } from 'antd';
import React from 'react';
import { FormComponentProps } from 'antd/es/form';

interface CreateFormProps extends FormComponentProps {
  modelVisible: boolean;
  handleAdd: (values: {}) => void;
  handleModelVisible: (flag: boolean) => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modelVisible, handleModelVisible, handleAdd, form } = props;
  const okHandler = () => {};
  return (
    <Modal
      destroyOnClose
      title="新增类型"
      visible={modelVisible}
      onCancel={() => handleModelVisible(false)}
      onOk={() => handleAdd()}
    >
      <Card></Card>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
