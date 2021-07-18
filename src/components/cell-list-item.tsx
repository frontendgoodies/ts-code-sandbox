import { Cell } from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

interface CellListItemsProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemsProps> = ({ cell }) => {
  let child: JSX.Element = cell.type === 'code' ? <CodeCell /> : <TextEditor />;

  return <div>{child}</div>;
};

export default CellListItem;
