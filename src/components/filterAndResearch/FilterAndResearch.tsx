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
  TabItems: Array<any>;
  onDataFiltered: (filteredData: Array<Faculty> | Array<Sector>) => void;
};

const FilterAndResearch = ({
  tabsList,
  TabItems,
  onDataFiltered,
}: FilterAndResearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [faculties, setFaculties] = useState(TabItems);

  const [selectedTab, setSelectedTab] = useState(tabsList[0]);
  // Fonction pour récupérer la liste complète des facultés depuis l'API

  // Filtrer les données en fonction du terme de recherche
  useEffect(() => {
    if (!searchTerm) {
      // onDataFiltered(TabItems); // Si aucun terme de recherche n'est saisi, afficher toutes les facultés
      return;
    }

    // console.log(faculties);

    // Filtrer les facultés en fonction du terme de recherche
    const filtered = TabItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    onDataFiltered(filtered);
  }, [searchTerm, TabItems, onDataFiltered]);

  // Fonction pour gérer le changement du terme de recherche
  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
      <div className="w-full md:w-72">
        <Input
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          crossOrigin={null}
          label="Search"
          className="peer focus:border-primary"
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        />
      </div>
    </div>
  );
};

export default FilterAndResearch;
