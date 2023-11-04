import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { searchUsers } from '@/services/ant-design-pro/api';
import { text } from 'express';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

function Image(props: { src?: string; alt?: string; width?: number }) {
  return <img src={props.src} alt={props.alt} width={props.width}></img>;
}

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  progress: number;
  money: number;
  memo: string;
};
// id?: number;
//     userName?: string;
//     userAccount?: string;
//     avatarUrl?: string;
//     gender?: number;
//     email?: string;
//     userState?: number;
//     phone?: string;
//     role?: number;
//     createTime?: Date;

export type TableListItem1 = {
  id: number;
  userName: string;
  userAccount: string;
  avatarUrl: string;
  gender: number;
  email: string;
  userState: number;
  phone: string;
  role: number;
  createTime: Date;
};
const tableListDataSource: TableListItem1[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

// for (let i = 0; i < 5; i += 1) {
//   tableListDataSource.push({
//     key: i,
//     name: 'AppName',
//     containers: Math.floor(Math.random() * 20),
//     creator: creators[Math.floor(Math.random() * creators.length)],
//     status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
//     createdAt: Date.now() - Math.floor(Math.random() * 2000),
//     money: Math.floor(Math.random() * 2000) * i,
//     progress: Math.ceil(Math.random() * 100) + 1,
//     memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
//   });
// }

const columns: ProColumns<TableListItem1>[] = [
  {
    title: '排序',
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    // render: (_) => <a>{_}</a>,
    // // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
    // filterDropdown: () => (
    //   <div style={{ padding: 8 }}>
    //     <Input style={{ width: 188, marginBlockEnd: 8, display: 'block' }} />
    //   </div>
    // ),
    // filterIcon: (filtered) => (
    //   <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    // ),
    copyable: true,
  },
  {
    title: '账户',
    dataIndex: 'userAccount',
    // valueEnum: {
    //   all: { text: '全部' },
    //   付小小: { text: '付小小' },
    //   曲丽丽: { text: '曲丽丽' },
    //   林东东: { text: '林东东' },
    //   陈帅帅: { text: '陈帅帅' },
    //   兼某某: { text: '兼某某' },
    // },
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    // initialValue: 'all',
    // filters: true,
    // onFilter: true,
    // valueEnum: {
    //   all: { text: '全部', status: 'Default' },
    //   close: { text: '关闭', status: 'Default' },
    //   running: { text: '运行中', status: 'Processing' },
    //   online: { text: '已上线', status: 'Success' },
    //   error: { text: '异常', status: 'Error' },
    // },
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={100}></Image>
      </div>
    ),
    // copyable: true,
  },
  {
    title: '用户状态',
    dataIndex: 'userState',
    // ellipsis: true,
    // copyable: true,
    valueType: 'select',
    valueEnum: {
      0: { text: '正常人', status: 'Success' },
      1: { text: '超人', status: 'Error' },
    },
  },
  {
    title: '用户职能',
    dataIndex: 'role',
    valueType: 'select',
    valueEnum: {
      0: { text: '普通用户', status: 'Default' },
      1: { text: '管理员', status: 'Success' },
    },
    // width: 180,
    // key: 'option',
    // valueType: 'option',
    // render: () => [
    //   <a key="link">链路</a>,
    //   <a key="link2">报警</a>,
    //   <a key="link3">监控</a>,
    //   <TableDropdown
    //     key="actionGroup"
    //     menus={[
    //       { key: 'copy', name: '复制' },
    //       { key: 'delete', name: '删除' },
    //     ]}
    //   />,
    // ],
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    // ellipsis: true,
    // copyable: true,
  },
];

export default () => {
  return (
    <PageContainer>
      <ProTable<TableListItem1>
        columns={columns}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          const resp = await searchUsers();
          return {
            data: resp.data?.users,
          };
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        dateFormatter="string"
        toolbar={{
          title: '高级表格',
          tooltip: '这是一个标题提示',
        }}
        toolBarRender={() => [
          <Button key="danger" danger>
            危险按钮
          </Button>,
          <Button key="show">查看日志</Button>,
          <Button type="primary" key="primary">
            创建应用
          </Button>,

          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: '1st item',
                  key: '1',
                },
                {
                  label: '2nd item',
                  key: '2',
                },
                {
                  label: '3rd item',
                  key: '3',
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </PageContainer>
  );
};
