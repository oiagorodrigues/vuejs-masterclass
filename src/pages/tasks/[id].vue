<script setup lang="ts">
import { getTaskQuery } from '@/utils/queries/tasks'

const route = useRoute('/tasks/[id]')
const { page } = usePageStore()

const getTask = async () => {
  const { data, error } = await getTaskQuery(route.params.id)

  if (error) {
    console.error(error)
    return
  }

  return data
}

const task = await getTask()

watchEffect(() => {
  page.title = `Task: ${task?.name || ''}`
})
</script>

<template>
  <Table>
    <template v-if="task">
      <TableRow>
        <TableHead> Name </TableHead>
        <TableCell>{{ task.name }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <TableCell>{{ task.description }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Assignee </TableHead>
        <TableCell>Lorem ipsum</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Project </TableHead>
        <TableCell>
          <RouterLink
            v-if="task.projects"
            :to="`/projects/${task.projects.slug}`"
            class="hover:underline"
          >
            {{ task.projects.name }}
          </RouterLink>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <TableCell>{{ task.status }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Collaborators </TableHead>
        <TableCell>
          <div class="flex">
            <Avatar
              class="-mr-4 border border-primary hover:scale-110 transition-transform"
              v-for="collaborators in task.collaborators"
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
      <TableRow class="hover:bg-transparent">
        <TableHead class="align-top pt-4"> Comments </TableHead>

        <TableCell>
          Comments cards goes in here..

          <div
            class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md"
          >
            <textarea
              placeholder="Add your comment.."
              class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
            >
            </textarea>
            <div class="flex justify-between mt-3">
              <Button> Comment </Button>
              <div class="flex gap-4">
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:paperclip"></iconify-icon>
                  <span class="sr-only">Attach file</span>
                </button>
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:image-up"></iconify-icon>

                  <span class="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </template>
    <TableEmpty v-else> No task data </TableEmpty>
  </Table>
</template>
