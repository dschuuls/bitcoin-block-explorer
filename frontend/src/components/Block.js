import { Link } from 'react-router-dom';

const Block = ({ block }) => {
  const t = new Date().getTime() / 1000;
  const et = Math.round((t - block.time) / 60);
  const mined = et < 1 ? 'a few seconds ago' : `${et} minute${et > 1 ? 's' : ''} ago`;
  return (
    <tr>
      <td>{block.height}</td>
      <td><Link to={`/${block.hash}`}>{block.hash}</Link></td>
      <td>{mined}</td>
    </tr>
  )
}

export default Block
