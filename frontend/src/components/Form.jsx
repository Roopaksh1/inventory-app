const Form = () => {
  return (
    <form className="">
      <p>
        <label htmlFor="">Name</label>
        <input type="text" required />
      </p>
      <p>
        <label htmlFor="">Category</label>
        <input type="text" />
      </p>
      <p>
        <label htmlFor="">Price</label>
        <input type="number" />
      </p>
      <p>
        <label htmlFor="">Quantity</label>
        <input type="number" />
      </p>
      <p>
        <label htmlFor="">Image</label>
        <input type="file" accept="image/png, image/jpeg, image/jpg" />
      </p>
      <p>
        <label htmlFor="">Description</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </p>
    </form>
  );
};

export default Form;
