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
  Popconfirm,
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
    const statusMap = ['error', 'default', 'default', 'success','success','error'];
    const status = ['待审核', '已取消', '已驳回','审核通过', '已结算','待确认'];

    const outcomeMap = ['error', 'default', 'default', 'success','success','error'];
    const outcome = ['未知', '赢', '输','平', '半赢','半输'];

const isMobile = window.screen.width < 500 ? true:false;

const OrderDetailModal = props => {
  const { modalVisible, handleModalVisible ,formValue} = props;
  return (
    <Modal
      title="订单信息"
      visible={modalVisible}
      onCancel={() => handleModalVisible()}
    >
     <Card bordered={false}>
      <DescriptionList size="large" style={{ marginBottom: 32 }}>

        <Description term="订单号">{formValue.orgerid}</Description>
        <Description term="金额">{formValue.amount}</Description>
        <Description term="时间">{moment(formValue.createtime).format('YYYY-MM-DD HH:mm:ss')}</Description>
        <Description term="状态"><Badge status={statusMap[formValue.status]} text={status[formValue.status]} /></Description>
        <Description term="内容">{formValue.content}</Description>
        <Description term="下注方">{formValue.whitchparty}</Description>
        <Description term="水位">{formValue.odds}</Description>
        <Description term="结果"><Badge status={outcomeMap[formValue.outcome]} text={outcome[formValue.outcome]} /></Description> 
        <Description term="盈利">{formValue.makemoney}</Description>
     
      </DescriptionList>
      <Divider style={{ marginBottom: 32 }} />
    </Card>     
    </Modal>
  );
};


const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建订单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="金额">
              {form.getFieldDecorator('amount', {
                  rules: [{ required: true, message: '输入金额' }],
              })(<InputNumber placeholder="请输入" />)}
          </FormItem>

           <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="下注内容">
              {form.getFieldDecorator('content', {
                  rules: [{ required: true, message: '输入下注内容' }],
              })(<Input placeholder="请输入" />)}
          </FormItem>

           <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="下注方">
              {form.getFieldDecorator('whitchparty', {
                  rules: [{ required: true, message: '输入下注方' }],
              })(<Input placeholder="请输入" />)}
          </FormItem>

           <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="下注水位">
              {form.getFieldDecorator('odds', {
                  rules: [{ required: true, message: '输入下注水位' }],
              })(<InputNumber min={0.01} max={1000} step={0.01} placeholder="请输入" />)}
          </FormItem>

    </Modal>
  );
});

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    detailModalVisible:false,
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    detailValue:{}
  };


  reload = ()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'order/reload',
    });
    setTimeout(this.reload,10*1000);
  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/fetch',
    });

    this.reload();
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
      type: 'order/fetch',
      payload: params,
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };


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
        type: 'order/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };


  handleDetailModalVisible = flag => {
    this.setState({
      detailModalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'order/create',
      payload: fields,
    });

    this.setState({
      modalVisible: false,
    });
  };

  handleDetailView = val=>{
    this.setState({
      detailModalVisible: true,
      detailValue:val
    });
  }


  handleConfirm = val=>{


    this.props.dispatch({
      type: 'order/confirm',
      payload: {
        orderid:val.orderid,
        action:"confirm"
      },
    });
  }

  handleCancle = val=>{

    this.props.dispatch({
      type: 'order/confirm',
      payload: {
        orderid:val.orderid,
        action:"cancle"
      },
    });
  }


  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
         
          {!isMobile && <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>}
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {


    const { order: { data }, loading } = this.props;

    const { selectedRows, modalVisible,detailModalVisible } = this.state;


   

    const columns =isMobile?[ 
      {
       title: '属性',
       render:val =>{
         return (<div onClick={()=>this.handleDetailView(val)}><div>{val.orderid}</div>
         <div>{moment(val.createtime).format('YYYY-MM-DD HH:mm')}</div>
         <div>{"内容："+val.content}</div>
         <div>{"下注方："+val.whitchparty}</div>
         <div>{"水位："+val.odds}</div></div>);
 
       }
     },
 
     {
       title: '数值',
       width:120,
       render:val =>{
         if(val.status == 2){
          return (<div><div>{"投注："+val.amount}</div><div><Badge status={statusMap[val.status]} text={status[val.status]+":"+val.remark} /></div><div><Badge status={outcomeMap[val.outcome]} text={outcome[val.outcome]} /></div><div>{"盈利："+val.makemoney}</div></div>);
         }else if(val.status==5){


          return (<div><div>{"投注："+val.amount}</div><div><Popconfirm title="是否确认系统对该订单的修改?" onConfirm={()=>this.handleConfirm(val)} onCancel={()=>this.handleCancle(val)} okText="确认订单" cancelText="取消订单">
          <Button type="primary">确认订单</Button>
    </Popconfirm></div><div><Badge status={outcomeMap[val.outcome]} text={outcome[val.outcome]} /></div><div>{"盈利："+val.makemoney}</div></div>);
         }else{

          return (<div><div>{"投注："+val.amount}</div><div><Badge status={statusMap[val.status]} text={status[val.status]} /></div><div><Badge status={outcomeMap[val.outcome]} text={outcome[val.outcome]} /></div><div>{"盈利："+val.makemoney}</div></div>);
         }
         
 
       }
     }]: [
      {
        title: '订单编号',
        dataIndex: 'orderid',
      },
    
      {
        title: '金额',
        dataIndex: 'amount',
      },

      {
        title: '内容',
        dataIndex: 'content',
      },

      {
        title: '下注方',
        dataIndex: 'whitchparty',
      },

      {
        title: '水位',
        dataIndex: 'odds',
      },

      {
        title: '结果',
        dataIndex: 'outcome',
        render(val) {
          return <Badge status={outcomeMap[val]} text={outcome[val]} />;
        },
      },


      {
        title: '盈利',
        dataIndex: 'makemoney',
      },
    
      {
        title: '状态',
        render:(val)=> {

          if(val.status == 5){
            return <Popconfirm title="是否确认系统对该订单的修改?" onConfirm={()=>this.handleConfirm(val)} onCancel={()=>this.handleCancle(val)} okText="确认订单" cancelText="取消订单">
                <Button type="primary">确认订单</Button>
          </Popconfirm>
          }else{

            if (val.status == 2) {
              return <Badge status={statusMap[val.status]} text={status[val.status] + ":" + val.remark} />;
            } else {
              return <Badge status={statusMap[val.status]} text={status[val.status]} />;
            }
          }
         
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createtime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      }
    ];


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const parentDetailMethods = {
      handleModalVisible: this.handleDetailModalVisible,
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <OrderDetailModal {...parentDetailMethods} modalVisible={detailModalVisible}  formValue={this.state.detailValue} />


      </PageHeaderLayout>
    );
  }
}
