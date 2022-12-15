// eslint-disable-next-line import/prefer-default-export
export const validateName = (rule, value, callback) => {
  if (!value) {
    callback(new Error('Пожалуйства введие имя'));
    return;
  }

  if (/[^а-яё]/i.test(value)) {
    callback(new Error('Имя может состоять только из кириллицы'));
    return;
  }

  callback();
};
