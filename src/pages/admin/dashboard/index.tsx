import { useEffect, useState } from "react"
import { DashboardService } from "../../../services/dashboard"
import { formatCurrency } from "../../../util/currency";

const DashboardPage = () => {
  const [ordersFinished, setOrdersFinished] = useState<{ qtd: number, billing: number }>({
    qtd: 0,
    billing: 0
  });

  const [ordersCanceled, setOrdersCanceled] = useState<{ qtd: number, billing: number }>({
    qtd: 0,
    billing: 0
  });

  const [ordersOpened, setOrdersOpened] = useState<{ qtd: number, billing: number }>({
    qtd: 0,
    billing: 0
  });

  const [date, setDate] = useState(new Date())

  const handleDate = (e: any) => {
    setDate(e.target.value)
  }

  useEffect(() => {
    const fetchDashboard = async () => {
      const result = await DashboardService.index(date.toString());
      setOrdersFinished(result.orders_finished);
      setOrdersCanceled(result.orders_canceled);
      setOrdersOpened(result.orders_opened);
    }
    fetchDashboard();
  }, [date])

  return (
    <div className="min-h-screen p-2 flex flex-col">
      <div>
        <label>Dia</label><br />
        <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-2" onChange={handleDate} />
      </div>
      <h1 className="text-lg font-bold mb-2">Quntidade</h1>
      <div className="shadow stats stats-vertical lg:stats-horizontal">
        <div className="stat bg-primary text-black">
          <div className="stat-title">Finalizados</div>
          <div className="stat-value">{ordersFinished.qtd ?? 0}</div>
        </div>
        <div className="stat bg-base-200">
          <div className="stat-title">Cancelados</div>
          <div className="stat-value">{ordersCanceled.qtd ?? 0}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Novos</div>
          <div className="stat-value">{ordersOpened.qtd ?? 0}</div>
        </div>
      </div>

      <h1 className="mt-2 text-lg font-bold mb-2">Faturamento</h1>
      <div className="shadow stats stats-vertical lg:stats-horizontal">

        <div className="stat bg-primary text-black">
          <div className="stat-title">Finalizados</div>
          <div className="stat-value">{formatCurrency(Number(ordersFinished.billing)) ?? 0.00}</div>
        </div>

        <div className="stat bg-base-200">
          <div className="stat-title">Cancelados</div>
          <div className="stat-value">- {formatCurrency(Number(ordersCanceled.billing)) ?? 0.00}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Previsto</div>
          <div className="stat-value">+ {formatCurrency(Number(ordersOpened.billing))?? 0}</div>
        </div>
      </div>

    </div>
  )
}

export default DashboardPage