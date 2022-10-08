<template>
  <div class="token-container">
    <!-- 标题 -->
    <el-alert
      title="微信小程序各种短信链接生成"
      type="info"
      show-icon
      :closable="false"
    >
    </el-alert>
    <br />

    <!-- 参数录入区域 -->
    <el-card>
      <div>
        <el-form
          :model="smsForm"
          ref="smsForm"
          label-width="150px"
          class="token-form"
          :rules="smsRules"
        >
          <el-form-item label="path链接:" prop="path">
            <el-input
              :placeholder="placeholder"
              v-model="smsForm.path"
            ></el-input>
          </el-form-item>
          <el-form-item label="域名环境选择:" prop="envType">
            <el-select v-model="smsForm.envType" placeholder="请选择所属环境">
              <el-option
                v-for="(item, index) in smsForm.envList"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="页面类型选择:" prop="smsType">
            <el-select v-model="smsForm.smsType" placeholder="请选择页面类型">
              <el-option
                v-for="(item, index) in smsForm.smsTypeList"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onTapCreate('smsForm')"
              >生成链接</el-button
            >
            <el-button @click="onTapReset('smsForm')">重置</el-button>
          </el-form-item>
          <el-form-item label="结果:" prop="result">
            <el-input
              type="textarea"
              v-model="smsForm.result"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onTapCopy('smsForm')" type="success"
              >复制结果</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { saveTextToClipBoard } from '@/utils/dom'

const envList = [
  {
    label: '测试环境',
    value: 'dev',
    baseUrl: 'https://ecuat.tk.cn/tk-online/pos/sms-to-miniprogram/#/?path='
  },
  {
    label: '生产环境',
    value: 'prod',
    baseUrl: 'https://m.tk.cn/tk-online/pos/sms-to-miniprogram/#/?path='
  }
]

const smsTypeList = [
  {
    label: '产品页面',
    value: 'product',
    placeholder:
      '请填写产品页面，eg：https://f.tk.cn/tkproperty/ksh/N20220003/?recall=A'
  },
  {
    label: '活动页面',
    value: 'web',
    placeholder:
      '请填写活动页面，eg：https://mp.weixin.qq.com/s/GAFpXcoiKZd7K3W0I6TAmw'
  },
  {
    label: '纯H5页面',
    value: 'pure',
    placeholder:
      '请填写H5页面（不会追加会员信息），eg：https://f.tk.cn/tkproperty/ksh/N20220003/?recall=A'
  },
  {
    label: '普通页面',
    value: 'normal',
    placeholder:
      '填写页面路径（参数有误链接将指向小程序首页），eg：pages/home/home?env=dev'
  }
]

const createPathFn = {
  product: (url) => {
    return encodeURIComponent(
      'pages/product/product?url=' + encodeURIComponent(url)
    )
  },
  web: (url) => {
    return encodeURIComponent(
      'pages/web-page/web-page?url=' + encodeURIComponent(url)
    )
  },
  pure: (url) => {
    return encodeURIComponent(
      'pages/pure-page/pure-page?url=' + encodeURIComponent(url)
    )
  },
  normal: (url) => {
    return encodeURIComponent(url)
  }
}

export default {
  data() {
    return {
      smsForm: {
        envList,
        smsTypeList,
        path: '',
        placeholder: '',
        envType: 'prod',
        smsType: 'normal',
        result: ''
      },
      smsRules: {
        path: [{ required: true, message: '请输入 path 路径', trigger: 'blur' }]
      }
    }
  },
  computed: {
    placeholder() {
      return this.smsForm.smsTypeList.find(
        (v) => v.value === this.smsForm.smsType
      )['placeholder']
    }
  },
  methods: {
    onTapCreate(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        console.log(this.smsForm.path)
        const { path, envType, envList, smsType } = this.smsForm
        let fn = createPathFn[smsType]
        this[formName].result =
          envList.find((v) => v.value === envType)['baseUrl'] +
          fn(path.replace(/\s/g, ''))
      })
    },
    onTapReset(formName) {
      console.log('表单》》', formName, this.$refs[formName])
      this.$refs[formName].resetFields()
      this[formName].result = ''
    },
    onTapCopy(formName) {
      saveTextToClipBoard(this[formName].result)
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.token-container {
  .token-form,
  .application-Form {
    width: 80%;
    .el-select {
      display: block;
    }
  }
}
</style>
