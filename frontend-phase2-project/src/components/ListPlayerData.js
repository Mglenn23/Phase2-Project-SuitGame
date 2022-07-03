function ListPlayerData({ playersDat, idx, scorePlayer, totalPlay }) {
  //replace character
  const score = scorePlayer.replace(/['"]+/g, "");
  const newScore = score.replaceAll(/[\])}[{(]/g, "");

  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{playersDat}</td>
      <td>{newScore.replace(/,/g, " ")}</td>
      <td>{totalPlay}</td>
    </tr>
  );
}
export default ListPlayerData;
