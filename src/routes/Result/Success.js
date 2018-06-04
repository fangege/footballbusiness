import React, { Fragment } from 'react';
import { Button, Row, Col, Icon, Steps, Card } from 'antd';
import Result from 'components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Step } = Steps;

export default () => (
  <PageHeaderLayout>
    <Card bordered={false}>
      <Result
        type="success"
        title="提交成功"
        description="提交结果页用于反馈一系列操作任务的处理结果"
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </PageHeaderLayout>
);
