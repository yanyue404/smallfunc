<template>
  <el-dialog
    class="e-c-image-area-draw"
    @close="close"
    width="790px"
    :append-to-body="true"
    :visible.sync="show"
    title="请绘制点击区域"
  >
    <div class="wrap">
      <img :src="src" alt />
      <div
        class="image-mask"
        @mousedown="mousedown"
        @mousemove="mousemove"
        @mouseup="mouseup"
      ></div>
      <div class="area">
        <span
          class="area-item flex-c-c active"
          key="new"
          :style="{
            left: area[0] + 'px',
            top: area[1] + 'px',
            width: area[2] + 'px',
            height: area[3] + 'px',
            background: `rgba(0, 0,0, 0.6)`
          }"
          >{{ activeIndex }}</span
        >
        <span
          class="area-item flex-c-c"
          v-for="(item, index) in clickArea"
          :key="index"
          :style="{
            left: item.area[0] + 'px',
            top: item.area[1] + 'px',
            width: item.area[2] + 'px',
            height: item.area[3] + 'px',
            background: `rgba(0, 0,0, 0.6)`
          }"
          >{{ index }}</span
        >
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  // props: {
  //   src: String,
  //   clickArea: Array,
  //   activeIndex: Number,
  // },
  data() {
    return {
      src: '',
      clickArea: [],
      activeIndex: 0,
      show: false,
      area: []
    }
  },
  watch: {
    show(v) {
      if (v) {
        this.$nextTick().then(() => {
          this.area = this.clickArea[this.activeIndex].area
        })
      }
    }
  },
  methods: {
    close(e) {
      this.activeSchema = null
      this.onClose && this.onClose(this.area)
    },
    mousedown(e) {
      let { offsetX, offsetY } = e
      this.isWork = true
      this.area = [offsetX, offsetY, 0, 0]
    },
    mousemove(e) {
      if (!this.isWork) return
      let { offsetX, offsetY } = e
      let [x, y] = this.area
      this.area = [x, y, offsetX - x, offsetY - y]
      console.log(this.area)
    },
    mouseup(e) {
      this.isWork = false
    }
  }
}
</script>
<style lang="scss">
.e-c-image-area-draw {
  .el-dialog__body {
    background: #e7e7e7;
  }
  .wrap {
    position: relative;
  }

  img {
    width: auto;
  }

  .image-mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    cursor: crosshair;
    z-index: 2;
  }

  .area-item {
    position: absolute;
    color: #fff;

    &.active {
      opacity: 0.5;
    }
  }
}
</style>
