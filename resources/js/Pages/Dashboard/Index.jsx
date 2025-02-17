import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import { formatMoney } from '@/utils/format'

const chartConfig = {
  amount: {
    label: 'Doanh thu: ',
    color: 'hsl(var(--chart-1))'
  }
}

export default function Index() {
  const { revenues: data } = usePage().props
  const formattedData = data.map((item) => ({
    month: `Tháng ${item.month}`,
    amount: Number(item.amount)
  }))

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Tổng quan</h2>}>
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <Card>
              <CardHeader>
                <CardTitle>Doanh thu</CardTitle>
                <CardDescription>12 tháng gần nhất</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={formattedData}>
                    <CartesianGrid vertical={true} />
                    <XAxis dataKey="month" tickLine={true} tickMargin={10} axisLine={true} />
                    <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="amount" fill="var(--color-amount)" radius={[8, 8, 0, 0]}>
                      <LabelList
                        position="top"
                        offset={12}
                        className="fill-foreground"
                        fontSize={12}
                        content={({ x, y, width, value }) => (
                          <text
                            x={x + width / 2}
                            y={y - 10}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-foreground"
                            fontSize={12}
                          >
                            {formatMoney(value)}
                          </text>
                        )}
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-center gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Biểu đồ doanh thu <TrendingUp className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
