<template>
  <el-form
    :model="addUserForm"
    :rules="rules"
    ref="addUserForm"
    class="add-form"
    label-position="left"
  >
    <h5 class="form-title">Добавение пользователя</h5>

    <el-form-item
      :label="$options.formFieldsOptions.nameFieldLabel"
      :prop="$options.formFieldsOptions.nameFieldProp"
    >
      <el-input
        type="text"
        v-model="addUserForm.name"
        :placeholder="$options.formFieldsOptions.nameFieldPlaceholder"
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item
      :label="$options.formFieldsOptions.phoneFieldLabel"
      :prop="$options.formFieldsOptions.phoneFieldProp"
    >
      <el-input
        type="number"
        v-model="addUserForm.phone"
        :placeholder="$options.formFieldsOptions.phoneFieldPlaceholder"
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item
      :label="$options.formFieldsOptions.selectFieldLabel"
      :prop="$options.formFieldsOptions.selectFieldProp">
      <el-select
        v-model="addUserForm.chief"
        :placeholder="$options.formFieldsOptions.selectFieldPlaceholder"
        class="form-select"
        clearable>
        <el-option
          v-for="chief in users"
          :key="chief.id"
          :label="chief.name"
          :value="chief.id"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="save-button-item">
      <el-button
        type="primary"
        class="save-button"
        @click="addUser"
      >
        Сохранить
      </el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import { validateName } from '../helpers/validators';

export default {
  name: 'AddUserForm',

  props: {
    users: {
      type: Array,
      required: true,
    },
  },

  formFieldsOptions: {
    nameFieldLabel: 'Имя',
    nameFieldProp: 'name',
    nameFieldPlaceholder: 'Имя',

    phoneFieldLabel: 'Телефон',
    phoneFieldProp: 'phone',
    phoneFieldPlaceholder: '89123456789',
    phoneFieldLength: 11,

    selectFieldLabel: 'Начальник',
    selectFieldProp: 'chief',
    selectFieldPlaceholder: 'Выберите начальника',
  },

  PHONE_LENGTH: 11,

  data() {
    return {
      addUserForm: {
        name: null,
        phone: null,
        chief: null,
      },

      rules: {
        name: [
          {
            required: true,
            validator: validateName,
            trigger: 'blur',
          },
        ],

        phone: [
          {
            required: true,
            message: 'Пожалуйста введите номер телефона',
            trigger: 'blur',
          },
          {
            min: Number(this.$options.PHONE_LENGTH),
            max: Number(this.$options.PHONE_LENGTH),
            message: `Телефон должен содержать ${this.$options.PHONE_LENGTH} символов`,
            trigger: 'blur',
          },
        ],
      },
    };
  },

  methods: {

    resetFormFields() {
      this.addUserForm = {
        name: null,
        phone: null,
        chief: null,
      };
    },

    addUser() {
      // eslint-disable-next-line consistent-return
      this.$refs.addUserForm.validate((valid) => {
        if (valid) {
          const form = {
            id: Date.now(),
            chiefID: this.addUserForm.chief,
            name: this.addUserForm.name,
            phone: Number(this.addUserForm.phone),
            children: [],
          };
          this.$emit('add', form);
          this.resetFormFields();
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.add-form {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.form-title {
  margin-bottom: 22px;
}

.form-select {
  width: 100%;
}

.el-form-item__content {
  margin-left: 80px;
}

.save-button-item .el-form-item__content {
  margin-left: unset;
}
</style>
