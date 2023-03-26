import { useTabStore } from "@/stores/utils";
import React from "react";

const TabLinks = () => {
  const TAB_LIST = [
    { name: "Vitals", key: 1 },
    { name: "Physical Examinations", key: 2 },
    { name: "Eye Examination", key: 3 },
    { name: "Lab Investigations", key: 4 },
    { name: "Further Investigations", key: 5 },
    { name: "Summary/Conclusion", key: 6 },
    { name: "Recommendation", key: 7 },
  ];

  const tabState = useTabStore();

  const handleTabClick = (key) => () => {
    tabState.setActiveTab(key);
  };
  return (
    <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
      {TAB_LIST.map((tab) => {
        return (
          <li
            class="nav-item sc"
            key={tab.key}
            onClick={handleTabClick(tab.key)}
          >
            <a
              class={`nav-link ${
                tab.key == tabState.activeTab ? "active" : ""
              }`}
            >
              {tab.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default TabLinks;
