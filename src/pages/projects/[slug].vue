<script setup lang="ts">
import { getProjectQuery } from '@/utils/queries/projects'

const route = useRoute('/projects/[slug]')
const { page } = usePageStore()

const getProject = async () => {
  const { data, error } = await getProjectQuery(route.params.slug)

  if (error) {
    console.error(error)
    return
  }

  return data
}

const project = await getProject()

watchEffect(() => {
  page.title = `Project: ${project?.name || ''}`
})
</script>

<template>
  <Table>
    <template v-if="project">
      <TableRow>
        <TableHead>Name</TableHead>
        <TableCell>{{ project.name }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <TableCell>{{ project.description }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <TableCell>{{ project.status }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Collaborators </TableHead>
        <TableCell>
          <div class="flex">
            <Avatar
              class="-mr-4 border border-primary hover:scale-110 transition-transform"
              v-for="collaborators in project.collaborators"
              :key="collaborators"
            >
              <RouterLink
                class="w-full h-full flex items-center justify-center"
                to=""
              >
                <AvatarImage src="" alt="" />
                <AvatarFallback> </AvatarFallback>
              </RouterLink>
            </Avatar>
          </div>
        </TableCell>
      </TableRow>
    </template>
    <TableEmpty v-else> No project data </TableEmpty>
  </Table>

  <section class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow">
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="project?.tasks?.length">
              <TableRow v-for="task in project.tasks" :key="task.id">
                <TableCell>
                  <RouterLink :to="`/tasks/${task.id}`" class="hover:underline">
                    {{ task.name }}
                  </RouterLink>
                </TableCell>
                <TableCell>{{ task.status }}</TableCell>
                <TableCell>{{ task.due_date }}</TableCell>
              </TableRow>
            </template>
            <TableEmpty v-else> No project data </TableEmpty>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2>Documents</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
      </div>
    </div>
  </section>
</template>

<style>
th {
  @apply w-[100px];
}

h2 {
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80;
}
</style>
