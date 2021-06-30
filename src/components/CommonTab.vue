<template>
  <!-- 面包屑 -->
  <div class="tabs">
    <el-tag
      :key="tag.name"
      size="small"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="changeMenu(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    ...mapMutations({
      close: 'tab/closeTab'
    }),
    handleClose(tag) {
      //this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.close(tag)
      const num = this.tags.length
      const beforepath = this.tags[num - 1]
      this.$router.push({ name: beforepath.name })
    },
    changeMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('tab/selectMenu', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
