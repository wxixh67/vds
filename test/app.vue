<template>
  <UContainer>
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold">🚀 我的 Nuxt UI 网站</h1>
      </template>

      <p class="text-gray-700">
        这是一个最小的 Nuxt UI + GitHub Pages 示例项目。
      </p>

      <template #footer>
        <UButton
          to="https://github.com/你的用户名/仓库名"
          target="_blank"
        >
          查看源码
        </UButton>
      </template>
    </UCard>
  </UContainer>
</template>