<template>
  <div>
    <el-table
      :data="data.tableData"
      :border="data.tableConfig.border"
      style="width: 100%;margin-top:10px;"
      :header-cell-style="{ background: '#00000030', color: '#fff' }"
      class="tableClass"
      @selection-change="tableSelectChange"
    >
      <!-- 多选框 -->
      <el-table-column
        v-if="data.tableConfig.selection"
        type="selection"
        width="55"
      >
      </el-table-column>
      <!-- 文本数据渲染 -->
      <template v-for="item in data.tableConfig.tHead">
        <!-- v-expand -->
        <el-table-column
          :key="item.field"
          v-if="item.columnType === 'expand'"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          type="expand"
        >
          <template slot-scope="scope">
            <slot :name="item.slotname" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- v-slot -->
        <el-table-column
          :key="item.field"
          v-else-if="item.columnType === 'slot'"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <slot :name="item.slotname" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- function -->
        <el-table-column
          :key="item.field"
          v-else-if="item.columnType === 'function'"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
        >
        </el-table-column>
        <!-- 文本 -->
        <el-table-column
          v-else
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
        >
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      style="margin-top:10px;"
      v-if="data.tableConfig.pagination.show"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.currentPage"
      :page-sizes="pageData.pageSizes"
      :page-size="pageData.pageSize"
      :layout="data.tableConfig.paginationLayout.layout"
      :total="pageData.total"
    >
    </el-pagination>
  </div>
</template>
<script>
import {
  reactive,
  onBeforeMount,
  watch,
  onMounted
} from "@vue/composition-api";
import { loadData } from "./tableLoadData";
import { paginationHook } from "./paginationHook";
// import { recordPage } from "./recordPge";
export default {
  name: "Tablevue",
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    tableRow: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, emit }) {
    // 加载数据
    const { tableData, tableLoadData } = loadData({ root });
    // 分页
    const {
      pageData,
      handleSizeChange,
      handleCurrentChange,
      totalCount
    } = paginationHook({
      root
    });
    // 翻页记录
    // const { aa, aafn } = recordPage({ root });
    // 组件变量
    const data = reactive({
      tableConfig: {
        // 多选框
        selection: true,
        //初始化是否加载
        isLoadingData: true,
        // 翻页记录
        recordCheckbox: false,
        // 竖线
        border: false,
        // 请求接口参数
        requestData: {},
        // 表头
        tHead: [],
        pagination: {
          show: true
        },
        paginationLayout: {
          layout: "prev, pager, next, jumper,total, sizes"
        }
      },
      tableData: [
        {
          name: "暴雨",
          no: "实时天气预警",
          typeName: "6/15-6/22",
          areaName: "橙色预警",
          collectionName: "及时做好采收"
        },
        {
          name: "风沙",
          no: "实时天气预警",
          typeName: "6/15-6/22",
          areaName: "黄色预警",
          collectionName: "及时做好采收"
        },
        {
          name: "高温",
          no: "实时天气预警",
          typeName: "6/15-6/22",
          areaName: "蓝色预警",
          collectionName: "及时做好采收"
        }
      ]
    });
    // watch(
    //   () => tableData.item,
    //   (newValue, oldValue) => (data.tableData = newValue)
    // );
    // watch(
    //   () => tableData,
    //   (newValue, oldValue) => console.log(123)
    // );
    // 数据渲染
    watch(
      [() => tableData.item, () => tableData.total],
      ([tableData, totalCountnum]) => {
        data.tableData = tableData;
        // console.log(data.tableData);
        totalCount(totalCountnum);
      }
    );

    // 页码监听
    watch(
      [() => pageData.pageSize, () => pageData.currentPage],
      ([pageSize, currentPage]) => {
        let requestData = data.tableConfig.requestData;
        if (requestData.data) {
          requestData.data.page = currentPage;
          requestData.data.pageSize = pageSize;
          // console.log(data.tableConfig.requestData);
          tableLoadData(data.tableConfig.requestData);
        }
      }
    );
    /**
     * 方法 methods
     *  */

    // 初始化table配置
    // 匹配相同的key 相同则替换
    const initTaleConfig = () => {
      console.log(444);
      let configData = props.config;
      // console.log(configData);
      let keys = Object.keys(data.tableConfig);
      for (let key in configData) {
        if (keys.includes(key)) {
          // ["selection", "recordCheckbox", "requestUrl", "tHead"].includes("requestUrl")
          data.tableConfig[key] = configData[key];
        }
      }
    };
    // 勾选checkbox时触发
    const tableSelectChange = val => {
      let rowData = {
        idItem: val.map(item => item.id)
      };
      // console.log(val.map(item => item.id));
      // console.log(props.tableRow);
      emit("update:tableRow", rowData);
    };
    // 刷新数据
    const refreshData = () => {
      // console.log("-------------");
      // console.log(data.tableConfig.requestData);
      tableLoadData(data.tableConfig.requestData);
    };
    // 带参数刷新数据
    const paramsLoadData = params => {
      let requestData = Object.assign({}, params, {
        page: 1,
        pageSize: 5
      });
      data.tableConfig.requestData.data = requestData;
      console.log(requestData);
      tableLoadData(data.tableConfig.requestData);
    };

    /* onBeforeMount */
    onBeforeMount(() => {
      initTaleConfig();
      if (data.tableConfig.isLoadingData) {
        tableLoadData(data.tableConfig.requestData);
      }
    });
    onMounted(() => {
      console.log(data);
    });
    return {
      data,
      pageData,
      handleSizeChange,
      handleCurrentChange,
      tableSelectChange,
      refreshData,
      paramsLoadData
    };
  }
};
</script>
<style lang="scss" scoped></style>
