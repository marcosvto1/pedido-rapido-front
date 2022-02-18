import './style.css'

enum TableStatus {
  AVAILABLE = 1,
  BUSY = 2
}

const TablePage = () => {

  const tables = [
    { id: 1, status: TableStatus.AVAILABLE },
    { id: 2, status: TableStatus.BUSY },
    { id: 3, status: TableStatus.AVAILABLE },
    { id: 4, status: TableStatus.AVAILABLE },
    { id: 5, status: TableStatus.AVAILABLE },
    { id: 6, status: TableStatus.AVAILABLE },
    { id: 7, status: TableStatus.AVAILABLE },
    { id: 8, status: TableStatus.AVAILABLE },
    { id: 9, status: TableStatus.AVAILABLE },
    { id: 10, status: TableStatus.AVAILABLE },
    { id: 11, status: TableStatus.AVAILABLE },
  ];

  const RenderTable = (key: number, status: TableStatus) => {
    if (status === TableStatus.AVAILABLE) {
      return <div key={key} className="item-table bg-primary text-black">{key}</div>
    }
    return <div key={key} className="item-table border-2 border-primary-focus text-primary">{key}</div>

  }

  return (
    <div className='flex flex-col'>
      <div className='text-center'>
        <h1 className='heading-1'>Mesas</h1>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 p-4 ">
        {tables.map((item) => {
          return RenderTable(item.id, item.status)
        })}
      </div>
    </div>
  )
}

export default TablePage;