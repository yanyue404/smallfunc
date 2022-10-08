<template>
  <div class="qrcode-container">
    <!-- 标题 -->
    <el-alert
      title="身份证号码生成工具"
      type="info"
      show-icon
      :closable="false"
    ></el-alert>
    <el-card>
      <el-form ref="form" label-width="120px">
        <el-form-item label="地区：">
          <el-cascader
            v-model="code"
            :options="codeData"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="生日/年龄：">
          使用生日：
          <el-switch v-model="useBrith"></el-switch>
          <div v-if="useBrith">
            <el-date-picker
              v-model="date"
              align="right"
              type="date"
              placeholder="选择生日"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
          <div v-else class="age-container">
            <el-input v-model="year" type="number"></el-input>岁
            <el-input v-model="month" type="number"></el-input>月
            <el-input v-model="dateDay" type="number"></el-input>天
          </div>
        </el-form-item>
        <el-form-item label="性别： ">
          <el-radio v-model="sex" label="男">男</el-radio>
          <el-radio v-model="sex" label="女">女</el-radio>
        </el-form-item>
      </el-form>

      <el-card>
        {{ idCode }}
        <el-button @click="updateIdCode">刷新</el-button>

        <ul>
          <li v-for="(id, index) in idCodes" :key="index">{{ id }}</li>
        </ul>
      </el-card>
    </el-card>
  </div>
</template>
<script>
import { dateFormat, getRangeToDate } from '@/utils/date'
const loadCode = () => import('./code.js')

function getCard(code, date, sex) {
  date = date || new Date()
  let random = Math.random().toString().substr(2, 2)
  let sexPos = parseInt(Math.random() * 4) * 2 + (sex == '男' ? 1 : 0)
  let id = code.toString() + dateFormat('yyyyMMdd', date) + random + sexPos
  let S =
    [7, 9, 10, 5, 8, 4, 2].reduce(
      (sum, item, index) =>
        sum + (parseInt(id[index]) + parseInt(id[index + 10])) * item,
      0
    ) +
    [1, 6, 3].reduce(
      (sum, item, index) => sum + parseInt(id[index + 7]) * item,
      0
    )
  id += '10X98765432'.substr(S % 11, 1)
  console.log(id)
  return id
}

export default {
  data() {
    return {
      useBrith: false,
      year: 0,
      month: 0,
      dateDay: 30,
      idCodes: [],
      url: '',
      date: new Date(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            test: '今天',
            onClick(picker) {
              const date = new Date()
              picker.$emit('pick', date)
            }
          },
          {
            test: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setDate(date.getDate() - 1)
              picker.$emit('pick', date)
            }
          },
          {
            test: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setDate(date.getDate() - 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      sex: '男',
      code: ['110000', '110100', '110114'],
      codeData: null,
      idCode: ''
    }
  },
  computed: {
    idCodeParams() {
      let { code, sex, date, useBrith, year, month, dateDay } = this
      if (!useBrith) {
        console.log({ y: year, m: month, d: dateDay })
        date = getRangeToDate({ y: -year, m: -month, d: -dateDay })
      }
      return { code: code && code[code.length - 1], sex, date }
    }
  },
  watch: {
    idCodeParams() {
      this.updateIdCode()
    }
  },
  mounted() {
    loadCode().then((res) => {
      function getCode(key, data) {
        let listObj = data[key]
        delete data[key]
        return Object.keys(listObj).map((key) => {
          return {
            value: key,
            label: listObj[key],
            children: data[key] ? getCode(key, data) : undefined
          }
        })
      }
      this.data = JSON.parse(JSON.stringify(res.default))
      this.codeData = getCode('86', res.default)
      this.updateIdCode()
    })
  },
  methods: {
    updateIdCode() {
      let { code, sex, date } = this.idCodeParams
      if (!code) {
        return (this.idCode = '请选择地区')
      }
      if (!date) {
        return (this.idCode = '请选择生日')
      }
      this.idCode = getCard(code.toString(), date, sex)
      let tmp = this.data['86']
      let addres = this.code.reduce((addr, item) => {
        addr += tmp[item]
        tmp = this.data[item]
        return addr
      }, '')
      this.idCodes.unshift({
        idCode: this.idCode,
        sex: sex,
        date: dateFormat('yyyy-MM-dd', date),
        addres
      })
    },
    handleChange(...e) {
      console.log('handleChange ==> ', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.qrcode-container {
  .age-container {
    display: flex;

    .el-input {
      width: 80px;
    }
  }

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
