import { useState, useEffect } from 'react';
import { useParams, Route } from "react-router-dom";

const Details = () => {

  const { hash } = useParams();
  const [block, setBlock] = useState({});

  useEffect(() => {
    const getBlock = async () => {
      const blockFromServer = await fetchBlock();
      setBlock(blockFromServer);
    }
    getBlock();
  }, []);

  const fetchBlock = async () => {
    const res = await fetch(`http://localhost:3000/blocks/${hash}`, { mode: 'cors' });
    return await res.json();
  }

  const renderData = [
    { key: 'Hash', value: block.hash },
    { key: 'Block index', value: block.block_index },
    { key: 'Previous block', value: block.prev_block },
    { key: 'Size', value: `${block.size} bytes` },
    { key: 'No. of transactions', value: block.n_tx },
    { key: 'Nonce', value: block.nonce },
    { key: 'Fee', value: `${block.fee} sats` }
  ];

  return Object.keys(block).length === 0 ? (<>loading ...</>) : (
    <>
      <header className="major"><h1>Block {block.height}</h1></header>
      <dl>
        {renderData.map((item, key) => (
          <div key={key}>
            <dt>{item.key}</dt>
            <dd>
              <p>{item.value}</p>
            </dd>
          </div>
        ))}
      </dl>
      <a href="/" className="button">&lt; back</a>
    </>
  )
}

export default Details
