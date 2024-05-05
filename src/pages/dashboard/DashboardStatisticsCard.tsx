import { statisticsCardsData } from '@/data'
import { StatisticsCard } from '@/widgets/cards'
import { Typography } from '@material-tailwind/react'
import React from 'react'

const DashboardStatisticsCard = () => {
  return (
    <>
    {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className="text-purple-600">{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
    </>
  )
}

export default DashboardStatisticsCard