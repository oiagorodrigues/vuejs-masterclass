export const usePageStore = defineStore('page', () => {
  const page = ref({
    title: 'Home',
  })

  return {
    page,
  }
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
