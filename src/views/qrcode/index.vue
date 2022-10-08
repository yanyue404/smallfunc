<template>
  <div class="qrcode-container">
    <!-- 标题 -->
    <el-alert
      title="二维码生成工具（采用qrcode实现）"
      type="info"
      show-icon
      :closable="false"
    >
    </el-alert>
    <!-- 生成二维码操作区域 -->
    <el-card class="card-box">
      <section class="content-box">
        <el-input
          class="txt"
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="text"
        >
        </el-input>
        <div class="opts-box">
          <el-button class="create-btn" type="success" @click="onTapQrcode"
            >生成二维码</el-button
          >
          <el-button class="reset-btn" @click="onTapReset">清空</el-button>
        </div>
      </section>
      <section class="qrcode-box" id="qrcode">
        <img v-if="url" :src="url" alt="" />
        <span v-else>此处预览二维码</span>
      </section>
    </el-card>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  data() {
    return {
      text: '',
      url: ''
    }
  },
  methods: {
    onTapQrcode() {
      if (!this.text) {
        this.$message('请输入内容')
        return
      }
      QRCode.toDataURL(this.text, {
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
          console.log(base64) //base64字符串
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onTapReset() {
      this.text = ''
      this.url = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.qrcode-container {
  .card-box {
    background-color: #f7f9f8;
    ::v-deep .el-card__body {
      display: flex;
      justify-content: center;
    }

    .content-box {
      .txt {
        ::v-deep .el-textarea__inner {
          min-height: 258px !important;
          width: 698px;
          padding: 18px 23px;
          background: #fff;
          border: 1px solid rgba(120, 130, 140, 0.25);
        }
      }
      .opts-box {
        margin: 32px 0 38px;
        text-align: center;
        .create-btn,
        .reset-btn {
          width: 160px;
          height: 44px;
        }
      }
    }

    .qrcode-box {
      margin-left: 30px;
      height: 258px;
      width: 260px;
      background: #fff;
      position: relative;
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        color: #ececec;
        font-size: 16px;
      }
    }
  }
}
</style>
