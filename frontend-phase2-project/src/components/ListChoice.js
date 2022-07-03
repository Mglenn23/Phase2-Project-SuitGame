function ListChoice({ img, name, fncHandler }) {
  return (
    <>
      <div className="contentGame" onClick={() => fncHandler(name)}>
        <img src={img} style={{ width: "50px" }} />
      </div>
    </>
  );
}
export default ListChoice;
