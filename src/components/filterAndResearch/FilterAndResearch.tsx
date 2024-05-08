import { Faculty } from "@/entities/faculty.entity";
import { Sector } from "@/entities/sector.entity";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input, Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export type TabItem = {
  label: string;
  value: string;
};

type FilterAndResearchProps = {
  tabsList: Array<TabItem>;
  withTabs?: boolean;
  withSearchBar?: boolean;
  query: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FilterAndResearch = ({
  tabsList,
  withTabs = true,
  query,
  handleChange,
  withSearchBar = true,
}: FilterAndResearchProps) => {
  const [selectedTab, setSelectedTab] = useState(tabsList[0]);
  // Fonction pour récupérer la liste complète des facultés depuis l'API

  return (
    <div
      className={`flex flex-col ${withTabs && withSearchBar && "justify-between"} ${
        withTabs && !withSearchBar && "justify-start"
      } ${
        withSearchBar && !withTabs && "justify-end"
      } items-center w-full gap-4 md:flex-row`}
    >
      {withTabs && (
        <Tabs value={selectedTab.value} className="w-auto">
          <TabsHeader className="bg-primary">
            {tabsList.map(({ label, value }, index) => (
              <Tab
                onClick={() => setSelectedTab(tabsList[index])}
                className={`${
                  selectedTab.value === value ? "text-primary" : `text-white`
                } w-max`}
                key={value}
                value={value}
              >
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      )}
      {withSearchBar && (
        <div className={"w-full md:w-72"}>
          <Input
            value={query}
            defaultValue={query}
            onChange={handleChange}
            crossOrigin={null}
            label="Search"
            className="peer focus:border-primary"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      )}
    </div>
  );
};

export default FilterAndResearch;
