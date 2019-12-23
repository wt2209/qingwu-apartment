import React from 'react';
import { Form, Upload, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { UploadFile } from 'antd/lib/upload/interface';
import styles from '../../style.less';

const { Dragger } = Upload;

interface Props extends FormComponentProps {}
interface State {
  fileList: Array<UploadFile>;
}

class Step3 extends React.Component<Props, State> {
  state: State = {
    fileList: [
      {
        uid: '-1',
        size: 100,
        type: 'string',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        size: 100,
        type: 'jpg',
        name: 'yyy.png',
        status: 'error',
      },
    ],
  };

  handleChange = (info: any) => {
    console.log(info);
    this.setState({ fileList: info.fileList });
    const { status } = info.file;
    if (status === 'done') {
      console.log('done');
    } else if (status === 'error') {
      console.log('error');
    }
  };

  render() {
    const { fileList } = this.state;
    return (
      <Form className={styles.stepForm}>
        <Dragger
          multiple
          fileList={fileList}
          listType="picture"
          onChange={this.handleChange}
          action="api/upload"
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">点击或将文件拖拽到此区域以上传凭证</p>
        </Dragger>
      </Form>
    );
  }
}

export default Form.create<Props>()(Step3);
