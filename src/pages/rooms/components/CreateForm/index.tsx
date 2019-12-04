import { Modal, Form, Input, InputNumber } from 'antd';
import React from 'react';
import { FormComponentProps } from 'antd/es/form';
import { removeEmpty } from '@/utils/tools';
import { RoomStoreData } from '@/services/room';

const FormItem = Form.Item;
interface CreateFormProps extends FormComponentProps {
  modelVisible: boolean;
  handleAdd: (values: Partial<RoomStoreData>) => void;
  handleModelVisible: (flag: boolean) => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modelVisible, handleModelVisible, handleAdd, form } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(removeEmpty(fieldsValue));
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新增类型"
      visible={modelVisible}
      onCancel={() => handleModelVisible(false)}
      onOk={okHandle}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="房间号">
        {form.getFieldDecorator('roomName', {
          rules: [{ required: true, message: '必须输入' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="楼号">
        {form.getFieldDecorator('building', {
          rules: [{ required: true, message: '必须输入' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="单元/楼层">
        {form.getFieldDecorator('unit', {
          rules: [{ required: true, message: '必须输入' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="定员人数"
        help="必须输入。用于公司使用时，填 1"
      >
        {form.getFieldDecorator('number', {
          rules: [{ required: true, message: '必须输入' }],
        })(<InputNumber min={0} max={20} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="默认租金">
        {form.getFieldDecorator('rent', {
          rules: [],
        })(<Input placeholder="请输入房间默认租金。可不填" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
        {form.getFieldDecorator('remark', {
          rules: [],
        })(<Input.TextArea placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
