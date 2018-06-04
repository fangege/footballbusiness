import React, { Fragment } from 'react';
import { Button, Icon, Card } from 'antd';
import Result from 'components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';


export default () => (
  <PageHeaderLayout>
    <Card bordered={false}>
      <Result
        type="error"
        title="提交失败"
        description="请核对信息后，再重新提交。"
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </PageHeaderLayout>
);
