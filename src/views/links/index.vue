<template>
  <div class="app-container">
    <!-- 标题 -->
    <el-alert
      title="常用调试链接列表（生成二维码，手机扫码访问）"
      type="info"
      show-icon
      :closable="false"
    />
    <br />
    <!-- 列表区域 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="No." width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Title" width="200">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Link(测试)" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.link_dev }}</span>
        </template>
      </el-table-column>
      <el-table-column label="QRcode" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="onTapQRcode(scope.row, 'dev')"
            >测试</el-button
          >
          <el-button type="success" @click="onTapQRcode(scope.row, 'prod')"
            >生产</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 二维码弹窗部分 -->
    <el-dialog
      title="手机扫码访问"
      class="qrcode-dialog"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <img v-if="url" :src="url" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcode'
const list = [
  {
    title: 'schema链接调用测试',
    link_dev: 'http://ftest.tk.cn/tkproperty/notify/pay-redirect/openLink/',
    link_prod: 'http://ftest.tk.cn/tkproperty/notify/pay-redirect/openLink/'
  }
]
export default {
  data() {
    return {
      list,
      listLoading: true,
      dialogVisible: false,
      url: ''
    }
  },
  mounted() {
    this.listLoading = false
  },

  methods: {
    onTapQRcode(info, type) {
      const text = info[`link_${type}`]
      QRCode.toDataURL(text, {
        errorCorrectionLevel: 'L',
        margin: 1,
        height: 260,
        width: 258,
        type: '10',
        scal: 177,
        type: '10',
        color: {
          dark: '#000', // 二维码背景颜色
          light: '#fff' // 二维码前景颜色
        },
        rendererOpts: {
          quality: 0.9
        }
      })
        .then((base64) => {
          this.url = base64
          console.log(base64) // base64字符串
        })
        .catch((err) => {
          console.log(err)
        })
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.qrcode-dialog {
  ::v-deep .el-dialog__body {
    position: relative;
    height: 350px;
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 258px;
      width: 260px;
      background: #fff;
    }
  }
}
</style>
