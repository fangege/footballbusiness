import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from 'components/DescriptionList';
import styles from './TableList.less';
const { Description } = DescriptionList;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
    const optMap = ['default', 'processing', 'success', 'error','error'];
    const opt = ['未知', '充值', '消费', '盈利','提款'];

 
    const PaymentDetailModal = props => {
      const { modalVisible, handleModalVisible ,formValue} = props;
      return (
        <Modal
          title="流水信息"
          visible={modalVisible}
          onCancel={() => handleModalVisible()}
        >
         <Card bordered={false}>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="金额">{formValue.amount}</Description>
            <Description term="余额">{formValue.balance}</Description>
            <Description term="时间">{moment(formValue.createtime).format('YYYY-MM-DD HH:mm:ss')}</Description>
   
            <Description term="备注">{formValue.remark}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
        </Card>     
        </Modal>
      );
    };
        


@connect(({ payment, loading }) => ({
    payment,
  loading: loading.models.payment,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    detailValue:{},
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'payment/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'payment/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'payment/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };



  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };


  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleDetailView = val=>{
    this.setState({
      modalVisible: true,
      detailValue:val
    });
  }

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'payment/fetch',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="客户ID">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {



    const { payment: { data }, loading } = this.props;

    const { selectedRows, modalVisible } = this.state;



    let isMobile = window.screen.width < 500 ? true:false;


    const columns = isMobile?[ 
     {
      title: '属性',
    
      render:val =>{
        return (<div onClick={()=>this.handleDetailView(val)}><div>{val.remark}</div><div>{moment(val.createtime).format('YYYY-MM-DD HH:mm:ss')}</div><div><Badge status={optMap[val.opt]} text={opt[val.opt]} /></div></div>);

      }
    },

    {
      title: '数值',
      width:120,
      render:val =>{
        return (<div><div>{"金额："+val.amount}</div><div>{"余额："+val.balance}</div></div>);

      }
    }]:[
     
      {
        title: '操作',
        dataIndex: 'opt',
        render(val) {
          return <Badge status={optMap[val]} text={opt[val]} />;
        },
      },
      {
        title: '金额',
        dataIndex: 'amount',
      },

      {
        title: '余额',
        dataIndex: 'balance',
      },

      {
        title: '备注',
        dataIndex: 'remark',
      },
    

      {
        title: '创建时间',
        dataIndex: 'createtime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];


    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <PaymentDetailModal {...parentMethods} modalVisible={modalVisible}  formValue={this.state.detailValue}/>
      </PageHeaderLayout>
    );
  }
}
