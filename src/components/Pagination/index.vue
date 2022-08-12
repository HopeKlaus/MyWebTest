<template>
  <div class="pagination">
    <button :disabled="pageNo==1"
            @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start >1"
            @click="$emit('getPageNo',1)"
            :class="{active:pageNo==1}">1</button>
    <button v-if="startNumAndEndNum.start >2">···</button>
    <button v-for="(page,index) in startNumAndEndNum.end"
            :key="index"
            v-show="page >= startNumAndEndNum.start"
            @click="$emit('getPageNo',page)"
            :class="{active:pageNo==page}">{{page}}</button>

    <button v-if="startNumAndEndNum.end<pageTotal-1">···</button>
    <button v-if="startNumAndEndNum.end<pageTotal"
            @click="$emit('getPageNo',pageTotal)"
            :class="{active:pageNo==pageTotal}">{{pageTotal}}</button>
    <button :disabled="pageNo==pageTotal"
            @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['continues', 'pageSize', 'pageNo', 'total'],
  computed: {
    pageTotal () {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算的是两个省略号中间连续页码的头和尾
    startNumAndEndNum () {
      const { continues, pageNo, pageTotal } = this;
      let start = 0, end = 0;
      // 总页数没有连续页码多 比如连续页码数为5，总页数只有4
      if (continues > pageTotal) {
        start = 1;
        end = pageTotal;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        };
        if (end > pageTotal) {
          end = pageTotal;
          start = pageTotal - continues + 1;
        }
      }
      return { start, end };
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.active {
  background-color: skyblue;
}
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
