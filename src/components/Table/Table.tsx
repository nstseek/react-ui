import React, {
  MouseEventHandler,
  ReactElement,
  useRef,
  useState
} from 'react';
import './Table.scss';

type TableCellProps = {
  [key in string | number]: any;
} & {
  className: string;
};

interface TableRow {
  cells: ReactElement<TableCellProps>[];
  description: ReactElement;
}

interface Props {
  tableHeader: ReactElement[];
  tableRows: TableRow[];
}

interface RowProps {
  row: TableRow;
  className?: string[];
}

const Row: React.FC<RowProps> = ({ row, className = [] }) => {
  const [description, setDescription] = useState(false);
  const rootDiv = useRef<HTMLDivElement>();

  const openDescription: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === rootDiv.current) {
      setDescription((desc) => !desc);
    }
  };

  const parseClasses = (data) => {
    let oldClasses = data.props.className.split(' ') || [];
    oldClasses = oldClasses.filter((classNm) => !!classNm);
    data.props.className = [...oldClasses, 'table-cell'].join('');
    return data;
  };

  return (
    <div
      ref={rootDiv}
      onClick={openDescription}
      className={[...className, 'table-row'].join(' ')}>
      {row.cells.map(parseClasses)}
      {description ? row.description : null}
    </div>
  );
};

const Header: React.FC<RowProps> = (props) => {
  let { className = [] } = props;
  className = [...className, 'table-header'];
  return <Row {...props} className={className} />;
};

const Table: React.FC<Props> = ({ tableHeader, tableRows }) => (
  <div className='Table'>Table Component</div>
);

export default Table;
