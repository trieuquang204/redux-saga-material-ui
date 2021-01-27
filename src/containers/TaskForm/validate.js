const validate = (values) => {
  const errors = {};
  const { title, description } = values;
  if (!title) {
    errors.title = "Vui long nhap tieu de";
  } else if (title.trim().length < 5) {
    errors.title = "Tieu de it nhat 5 ky tu";
  }

  return errors;
};

export default validate;
