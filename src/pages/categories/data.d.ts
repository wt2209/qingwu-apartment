export interface CategoryListItem {
  id: number;
  title: string;
  type: 'person' | 'company' | 'functional'; //个人居住，公司或机构，功能性用房（仓库等）
  utilityType: string;
  chargeRules: {
    [key: string]: number[];
  };
  remark: string;
  status?: 'show' | 'hide'; // 是否在主页面“选择楼号”中显示
}
