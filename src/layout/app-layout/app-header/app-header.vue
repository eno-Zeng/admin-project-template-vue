<template>
  <div class="app-header">
    <div class="left">客户管理系统</div>
    <div class="center">header center</div>
    <div class="right">
      <el-dropdown trigger="click" placement="bottom-end" @visible-change="handleVisibleChange">
        <div class="user-container">
          <el-icon class="user-filled" size="16px"><UserFilled /></el-icon>
          <span class="user-name">eno</span>
          <el-icon size="16px" class="caret-bottom" :class="{ reversal: dropDownVisible }">
            <CaretBottom />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="dropdown-menu-item">
            <el-dropdown-item @click.stop="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UserFilled, CaretBottom } from '@element-plus/icons-vue';
import { ref } from 'vue';

const dropDownVisible = ref(false);
const handleVisibleChange = (visible: boolean) => {
  dropDownVisible.value = visible;
};

const logout = () => {
  console.log('logout');
};
</script>

<style lang="scss" scoped>
@import '@/styles/app-layout-var.scss';

.app-header {
  height: $app-header-height;
  background-color: $app-header-bg;
  display: flex;
  align-items: center;
  .left {
    width: $app-aside-width;
  }
  .center {
    flex: 1;
  }
  .right {
    width: $app-header-right-width;

    .user-container {
      width: $app-header-right-width;
      display: flex;
      align-items: center;
      .user-filled,
      .caret-bottom {
        width: 16px;
      }
      .user-name {
        flex: 1;
        margin: 0 4px;
        font-size: 16px;
        text-align: justify;
        text-align-last: justify;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .caret-bottom {
        transition: transform 0.5s ease-out;
      }
      .reversal {
        transform: rotate(0.5turn);
      }
    }
  }
}
</style>
