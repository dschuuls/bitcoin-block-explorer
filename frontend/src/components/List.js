import Block from './Block'

const List = ({ blocks }) => {
  return (
    <div className="table-wrapper">
      <table className="alt">
        <thead>
          <tr>
            <th>Height</th>
            <th>Hash</th>
            <th>Mined</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, hash) => (
            <Block key={hash} block={block} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default List
