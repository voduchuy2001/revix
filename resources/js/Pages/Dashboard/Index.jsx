import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/Components/ui/chart'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import RevenueReport from './Partials/RevenueReport'
import CreateRevenueReport from './Partials/CreateRevenueReport'

const chartConfig = {
  amount: {
    label: 'Doanh thu: ',
    color: 'hsl(var(--chart-1))'
  }
}

export default function Index() {
  const { branchOne = [], branchTwo = [] } = usePage().props

  const formattedBranchOne = branchOne.map((item) => ({
    month: `T ${item.month}`,
    amount: Number(item.amount)
  }))

  const formattedBranchTwo = branchTwo.map((item) => ({
    month: `T ${item.month}`,
    amount: Number(item.amount)
  }))

  const revenueByMonth = {}
  branchOne.forEach(({ month, amount }) => {
    revenueByMonth[month] = (revenueByMonth[month] || 0) + Number(amount)
  })
  branchTwo.forEach(({ month, amount }) => {
    revenueByMonth[month] = (revenueByMonth[month] || 0) + Number(amount)
  })
  const formattedTotalRevenue = Object.keys(revenueByMonth).map((month) => ({
    month: `T ${month}`,
    amount: revenueByMonth[month]
  }))

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Tổng quan doanh thu</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-6">
            <ChartContainer config={chartConfig} className="bg-white shadow-sm sm:rounded-lg py-12 px-4">
              <h3 className="text-lg font-semibold mb-4">Tổng doanh thu</h3>
              <BarChart accessibilityLayer data={formattedTotalRevenue}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={8}></Bar>
              </BarChart>
            </ChartContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChartContainer config={chartConfig} className="bg-white shadow-sm sm:rounded-lg py-12 px-4">
                <h3 className="text-lg font-semibold mb-4">Doanh thu Chi nhánh 1</h3>
                <BarChart accessibilityLayer data={formattedBranchOne}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                  <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="amount" fill="hsl(var(--chart-4))" radius={8}></Bar>
                </BarChart>
              </ChartContainer>

              <ChartContainer config={chartConfig} className="bg-white shadow-sm sm:rounded-lg py-12 px-4">
                <h3 className="text-lg font-semibold mb-4">Doanh thu Chi nhánh 2</h3>
                <BarChart accessibilityLayer data={formattedBranchTwo}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                  <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="amount" fill="hsl(var(--chart-5))" radius={8}></Bar>
                </BarChart>
              </ChartContainer>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-4">
              <div className="sm:col-span-2 lg:col-span-7 bg-white shadow-sm sm:rounded-lg">
                <RevenueReport />
              </div>

              <div className="sm:col-span-2 lg:col-span-3 bg-white shadow-sm sm:rounded-lg">
                <CreateRevenueReport />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
