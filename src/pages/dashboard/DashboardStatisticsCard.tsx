import { CardTypes, statisticsCardsData } from "@/data";
import { useStudentCardsStatistics } from "@/hooks/useStudent";
import { StatisticsCard } from "@/widgets/cards";
import { Typography } from "@material-tailwind/react";
import React, { useCallback, useMemo } from "react";

const DashboardStatisticsCard = () => {
  const { loadCard, cardsStatistics } = useStudentCardsStatistics();

  const handleDisplayStats = useCallback(
    (identifier: CardTypes) => {
      switch (identifier) {
        case "total_students":
          return cardsStatistics?.studentsCount;
        case "total_males":
          return cardsStatistics?.maleStudentsCount;
        case "total_females":
          return cardsStatistics?.femaleStudentsCount;
        case "total_printed":
          return cardsStatistics?.totalPrintedCardsCount;
        case "total_validated":
          return cardsStatistics?.totalValidatedCardsCount;
        default:
          return 0;
      }
    },
    [cardsStatistics],
  );

  return (
    <>
      {statisticsCardsData.map(({ icon, title, footer, index, ...rest }) => (
        <StatisticsCard
          key={title}
          {...rest}
          value={handleDisplayStats(index)}
          title={title}
          icon={React.createElement(icon, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-purple-600">
                {handleDisplayStats(index)}
              </strong>
              &nbsp;{footer.label}
            </Typography>
          }
        />
      ))}
    </>
  );
};

export default DashboardStatisticsCard;
