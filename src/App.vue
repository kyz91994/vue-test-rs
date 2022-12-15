<template>
  <div class="container">
    <div class="row row--center">
      <div class="column">
        <el-button
          @click="openModalWindow"
          :disabled="isModalShown"
          class="add-button"
        >
          Добавить
        </el-button>
        <users-table
          v-if="users && users.length"
          :users="users"
        ></users-table>
      </div>
      <div class="column">
        <div class="modal-window" v-if="isModalShown">
          <i class="el-icon-close" @click="closeModalWindow"></i>
          <add-user-form
            v-on:add="addUser"
            :users="allUsersInTable"
          ></add-user-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersTable from './components/UsersTable';
import AddUserForm from './components/AddUserForm';

export default {
  name: 'app',

  components: { AddUserForm, UsersTable },

  data() {
    return {
      users: [],
      isModalShown: false,
    };
  },

  computed: {
    allUsersInTable() {
      const items = [];
      return this.findChiefs(this.users, items);
    },
  },

  mounted() {
    this.getUsersFromLocalStorage();
  },

  methods: {
    closeModalWindow() {
      this.isModalShown = false;
    },

    openModalWindow() {
      this.isModalShown = true;
    },

    addUsersToLocalStorage(users) {
      localStorage.setItem('users-list', JSON.stringify(users));
    },

    getUsersFromLocalStorage() {
      const users = localStorage.getItem('users-list');
      if (users) {
        this.users = JSON.parse(users);
      }
    },

    addUser(user) {
      if (user.chiefID) {
        this.findParent(this.users, user);
        return;
      }
      this.users.push(user);
      this.addUsersToLocalStorage(this.users);
    },

    findParent(users, user) {
      users.forEach((userItem) => {
        if (userItem.id === user.chiefID) {
          userItem.children.push(user);
          this.addUsersToLocalStorage(this.users);
        } else {
          this.findParent(userItem.children, user);
        }
      });
    },

    findChiefs(users, items) {
      users.forEach((user) => {
        items.push({ name: user.name, id: user.id, phone: user.phone });
        if (user.children.length > 0) {
          this.findChiefs(user.children, items);
        }
      });
      return items;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 50px 20px;
  max-width: 1920px;
  margin: 0 auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.row--center {
  justify-content: center;
  gap: 50px;
}

.column {
  display: flex;
  flex: 0 0 40%;
  flex-direction: column;
  gap: 20px;
}

.add-button {
  max-width: 320px;
  align-self: flex-end;
}

.modal-window {
  min-width: 350px;
  max-width: 500px;
  margin-top: 60px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  position: relative;
}

.el-icon-close {
  position: absolute;
  top: 20px;
  right: 10px;
  border-radius: 50%;
  padding: 5px;
}

.el-icon-close:hover {
  cursor: pointer;
  background: #DCDFE6;
}
</style>
