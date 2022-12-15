<template>
  <div>
    <el-table
      :data="users"
      row-key="id"
      class="users-table"
      border
      default-expand-all
    >
      <el-table-column
        :prop="$options.tableOptions.namePropHeader"
        :label="$options.tableOptions.nameLabelHeader"
        sortable
      >
      </el-table-column>
      <el-table-column
        :prop="$options.tableOptions.phonePropHeader"
        :label="$options.tableOptions.phoneLabelHeader"
        sortable
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'UsersTable',

  tableOptions: {
    nameLabelHeader: 'Имя',
    namePropHeader: 'name',
    phoneLabelHeader: 'Телефон',
    phonePropHeader: 'phone',
  },

  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};

</script>

<style scoped>
.users-table {
  min-width: 350px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
}
</style>
