import { Modal, Form, Input, InputNumber } from 'antd';
import React from 'react';
import { FormComponentProps } from 'antd/es/form';
import { RoomFormValueType } from '../../data';

const FormItem = Form.Item;
interface CreateFormProps extends FormComponentProps {
  modelVisible: boolean;
  defaultValue: RoomFormValueType;
  handleSubmit: (values: RoomFormValueType) => void;
  handleModalVisible: (flag: boolean) => void;
}

const CreateOrUpdateForm: React.FC<CreateFormProps> = props => {
  const { modelVisible, handleModalVisible, handleSubmit, form } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleSubmit(fieldsValue);
    });
  };
  const { defaultValue } = props;
  return (
    <Modal
      destroyOnClose
      title="新增类型"
      visible={modelVisible}
      onCancel={() => handleModalVisible(false)}
      onOk={okHandle}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="房间号">
        {form.getFieldDecorator('roomName', {
          initialValue: defaultValue.roomName,
          rules: [{ required: true, message: '必须输入' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="楼号">
        {form.getFieldDecorator('building', {
          initialValue: defaultValue.building,
          rules: [{ required: true, message: '必须输入' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="单元/楼层">
        {form.getFieldDecorator('unit', {
          initialValue: defaultValue.unit,
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
          initialValue: defaultValue.number,
          rules: [{ required: true, message: '必须输入' }],
        })(<InputNumber min={0} max={20} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="默认租金">
        {form.getFieldDecorator('rent', {
          initialValue: defaultValue.rent,
          rules: [],
        })(<Input placeholder="请输入房间默认租金。可不填" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
        {form.getFieldDecorator('remark', {
          initialValue: defaultValue.remark,
          rules: [],
        })(<Input.TextArea placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateOrUpdateForm);
